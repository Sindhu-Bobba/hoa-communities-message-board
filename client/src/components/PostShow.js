import React, { useState, useEffect } from "react"
import translateServerError from "../services/translateServerErrors.js"


const PostShow = (props) => {
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        postDate: "",
        userId: props.userId

    });
    const [errors, setErrors] = useState({})
    const community = props.community
    const user = props.user;



    const addNewPost = async (formData) => {
        try {
            console.log("API Endpoint:", `/api/v1/communities/${community.id}/posts/${user.id}`);
            console.log("FormData:", formData);
            const response = await fetch(`/api/v1/communities/${community.id}/posts`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerError(body.errors)
                    return setErrors(newErrors)
                } else {
                    throw (new Error(`${response.status} (${response.statusText})`))
                }
            } else {
                const responseBody = await response.json()
                const postData = props.posts.concat(responseBody.newPost)
                setErrors({})
                props.setPosts(postData)
            }
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const handleInputChange = (event) => {
        setNewPost({
            ...newPost,
            [event.currentTarget.name]: event.currentTarget.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewPost(newPost)
    }

    const clearForm = () => {
        setNewPost({
            title: "",
            content: "",
            postDate: ""
        })
    }


    return (
        <div>
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">
                            <h4>
                                Title:
                            </h4>
                            <input
                                id="title"
                                className="post-input"
                                type="text"
                                name="title"
                                value={newPost.title}
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
                                className="post-input"
                                name="content"
                                onChange={handleInputChange}
                                value={newPost.content}
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
                                className="post-input"
                                name="postDate"
                                value={newPost.postDate}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="post-button-group">
                        <input className="post-button" type="button" value="Clear Post" onClick={clearForm} />
                        <input className="post-button" type="submit" value="Submit post" />
                    </div>

                </form>
            </div>
            <ul className="post-list">
                {props.posts.map((post, index) => (
                    <li key={index} className="post-item">
                        <h4>Title: {post.title}</h4>
                        <p>Content: {post.content}</p>
                        <p>Post Date: {post.postDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );


};

export default PostShow;