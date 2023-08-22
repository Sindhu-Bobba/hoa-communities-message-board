import React, { useState } from "react"
import translateServerError from "../services/translateServerErrors.js"
import { Redirect } from "react-router-dom"
import ErrorList from "./layout/ErrorList.js"
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";

const PostForm = (props) => {
    const { id } = useParams();
    const { user } = props;
    console.log(props)
    const [postRecord, setPostRecord] = useState({
        content: "",
        postDate: "",
        image: ""
    })
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
   

    const addNewPost = async (event) => {
        const postFormData = new FormData()
        postFormData.append("content", postRecord.content);
        postFormData.append("postDate", postRecord.postDate);
        postFormData.append("image", postRecord.image);

        try {
            const response = await fetch(`/api/v1/communities/${id}/posts/${user.id}`, {
                method: "POST",
                headers: {
                    "Accept": "image/jpeg"
                },
                body: postFormData
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
                setShouldRedirect(true)
            }
        } catch (error) {
            console.log(error)
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleChange = (event) => {
        setPostRecord({
            ...postRecord,
            [event.currentTarget.name]: event.currentTarget.value,
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewPost()
    }

    if (shouldRedirect) {
        return <Redirect push to={`/${id}/postlists`} />
    }

    const handleImageUpload = (acceptedSiteImage) => {
        setPostRecord({
            ...postRecord,
            image: acceptedSiteImage[0],
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <ErrorList errors={errors} />
                <label htmlFor="content">
                    <h4>
                        Post:
                    </h4>
                    <input
                        id="content"
                        type="text"
                        name="content"
                        onChange={handleChange}
                        value={postRecord.content}
                    />
                </label>

                <label htmlFor="postDate">
                    <h4>
                        PostDate:
                    </h4>
                    <input
                        id="postDate"
                        type="text"
                        name="postDate"
                        onChange={handleChange}
                        value={postRecord.postDate}
                    />
                </label>

                <Dropzone onDrop={handleImageUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className="button">Add Image (optional)</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <input type="submit" value="Add post" className="button" />
            </form>
        </div >
    )
}
export default PostForm