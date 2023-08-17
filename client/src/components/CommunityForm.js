import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "./layout/ErrorList.js"
import PostTile from "./PostTile.js"
import translateServerErrors from "../services/translateServerErrors.js"

const CommunityForm = (props) => {
    const [communityRecord, setCommunityRecord] = useState({
        communityName: "",
        description: "",
        posts: []
    })
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewCommunity = async (event) => {
        try {
            const response = await fetch(`/api/v1/communities/${communityId}/posts`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(event)
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw (error)
                }
            } else {
                const body = await response.json()
                const updatedPosts = communityRecord.posts.concat(body.post)
                setErrors([])
                setCommunityRecord({ ...communityRecord, posts: updatedPosts })
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleChange = (event) => {
        setCommunityRecord({
            ...communityRecord,
            [event.currentTarget.name]: event.currentTarget.value,
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewCommunity()
    }
    if (shouldRedirect) {
        return <Redirect push to="/" />
    }



    const postTiles = communityRecord.posts.map(post => {
        return (
            <PostTile
                key={post.id}
                {...post}
            />
        )
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create New Community</h2>
                <ErrorList errors={errors} />
                <label htmlFor="name">
                    Community Name:
                    <input
                        id="name"
                        type="text"
                        name="communityName"
                        onChange={handleChange}
                        value={communityRecord.communityName}
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={communityRecord.description}
                    />
                </label>
                <button type="submit">Create Community</button>
            </form>
            <div>
                <h1>{communityRecord.communityName}</h1>
                <h4>Posts:</h4>
                {postTiles}
            </div>
        </div>
    )
}
export default CommunityForm