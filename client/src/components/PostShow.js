import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const PostShow = (props) => {
    const [posts, setPosts] = useState([])

    const communityId = props.match.params.communityId;
    const currentUser = props.user;

    const getPost = async () => {
        try {
            const response = await fetch(`/api/v1/communities/${communityId}/posts`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setPosts(body.post)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    useEffect(() => {
        getPost()
    }, [])



    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default PostShow