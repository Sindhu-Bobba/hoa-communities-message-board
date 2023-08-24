import React, { useState, useEffect } from "react"
import translateServerError from "../services/translateServerErrors.js"
import { Redirect } from "react-router-dom"
import ErrorList from "./layout/ErrorList.js"
import { Link } from "react-router-dom"

const PostShow = (props) => {
    const communityId = props.match.params.communityId;
    const { user } = props;
    const [errors, setErrors] = useState([]);
    const [posts, setPosts] = useState([]); 
    const [isFormVisible, setIsFormVisible] = useState(false);


    const [formData, setFormData] = useState({
        title: "",
        content: "",
        postDate: ""
    });

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const getPost = async () => {
        try {
            const response = await fetch(`/api/v1/communities/${communityId}/posts`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setPosts(body.posts)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    useEffect(() => {
        getPost()
    }, [])
   
    
        
        

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newPost = {
            title: formData.title,
            content: formData.content,
            postDate: formData.postDate
        };
        try {
            const response = await fetch(`/api/v1/communities/${communityId}/posts/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json();
                    const newErrors = translateServerError(body.error);
                    return setErrors(newErrors);
                } else {
                    throw (new Error(`${response.status} (${response.statusText})`))
                }
            } else {
                const createdPost = await response.json(); 
                setPosts([...posts, createdPost.post]); 
                setFormData({
                    title: "",
                    content: "",
                    postDate: ""
                });
                setIsFormVisible(false);
            }
        } catch (error) {

            console.log(error)
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    

return (
    <div>
        <h1>Community Discussions</h1>
        {!isFormVisible ? (
        <button onClick={toggleForm}>Add Post</button>
        ) : null}

        {isFormVisible ? (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">
                        <h4>
                            Title:
                        </h4>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </label>

                </div>
                <div>
                    <label htmlFor="content">
                        <h4>
                            Post:
                        </h4>
                        <textarea
                            id="content"
                            type="text"
                            name="content"
                            onChange={handleInputChange}
                            value={formData.content}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="postDate">
                        <h4>
                            postDate:
                        </h4>
                        <input
                            id="postDate"
                            type="text"
                            name="postDate"
                            value={formData.postDate}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <input type="submit" value="Add post" className="button" />
                <input value="Cancel" className="button" onClick={toggleForm}/>
            </form>
        ) : null}


    {!isFormVisible ? (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
        ) : null}
    </div>
);
};

export default PostShow;