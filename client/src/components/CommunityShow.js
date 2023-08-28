import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PostTile from "./PostTile"
import PostShow from "./PostShow.js"

const CommunityShow = (props) => {
    const [community, setCommunity] = useState({
        communityName: "",
        description: "",
        image: "",
        town: "",
        state: ""
    })
    const [posts, setPosts] = useState([])

    const communityId = props.match.params.id
    const currentUser = props.user;
    // const userId = props.match.params.id


    const getCommunity = async () => {
        try {
            const response = await fetch(`/api/v1/communities/${communityId}`)
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const body = await response.json()
            setCommunity(body.community)
            // setPosts([])
            // setPosts(body.community.posts)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const setPostHandler = (targetId, value) => {
        const modPosts = posts.map((post) => {
            if (post.id === targetId) {
                post.netVoteValue = post.netVoteValue + value;
                post.hasVoted = true
            }
            return post;
        });
        setPosts(modPosts);
    }

    useEffect(() => {
        getCommunity()
    }, [])

    const postList = posts.map(post => {
        return (
            <PostTile
                key={post.id}
                {...post}
                user={props.user}
            />
        )
    })
    let postShowForm;
    if (currentUser) {
        postShowForm =
            <PostShow
                community={community}
                user={props.user}
                setCommunity={setCommunity}
                setPosts={setPosts}
                posts={posts}
                setPostHandler={setPostHandler}
            />
    } else {
        postShowForm = <h4>Please Sign Up or Sign In </h4>
    }


    return (
        <div className="community-container">
            <h1 className="community-name">{community.communityName}</h1>
            <div className="container__row">
                <div className="container__col-md-5">
                    <div class="profile-pic">
                        <img src={community.image} alt={community.description} className="image-border" />
                    </div>
                    <div className="community-details">
                        <div className="community-description">
                            <h3 >About Community:</h3>
                            <p>{community.description}</p>
                        </div>
                        <div className="community-info">
                            <h3 >Town:</h3>
                            <p> {community.town}</p>
                        </div>
                        <div className="community-info">
                            <h3 >State:</h3>
                            <p>{community.state}</p>
                        </div>
                    </div>
                </div>
                <div className="container__col-md-6 align-right container__col-offset-1">
                    {postShowForm}
                    {postList}
                </div>
            </div>
        </div>

    )
}
export default CommunityShow