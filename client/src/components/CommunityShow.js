import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CommunityShow = (props) => {
    const [community, setCommunity] = useState({
        communityName: "",
        description: "",
        image: "",
        town: "",
        state: ""
    })


    const communityId = props.match.params.id

    const getCommunity = async () => {
        try {
            const response = await fetch(`/api/v1/communities/${communityId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setCommunity(body.community)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    useEffect(() => {
        getCommunity()
    }, [])


    return (
        <div className="community-container">
            <header className="community-header">

                {community.image &&
                    <img src={community.image} alt={community.description} className="community-image" />}


            </header>

            <h1 className="community-name">{community.communityName}</h1>
            <h3 className="community-description">{community.description}</h3>
            <h3 className="community-town">{community.town}</h3>
            <h3 className="community-state">{community.state}</h3>
            <div className="tile-container">

                <div className="tile">
                    <Link to="/new-events">
                        New Events
                    </Link>
                </div>
                <div className="tile">
                    <Link to="/discussions">
                        Discussions
                    </Link>
                </div>

                <div className="tile ">
                    <Link to="/community-news">
                        Community News
                    </Link>
                </div>
            </div>




        </div>

    )
}
export default CommunityShow