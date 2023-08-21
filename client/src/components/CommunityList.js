import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


const CommunityList = props => {
    const [communityList, setCommunityList] = useState([])
    const getCommunities = async () => {
        try {
            const response = await fetch(`/api/v1/communities`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
            }
            const body = await response.json()
            setCommunityList(body.communityList)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }

    }
    
    useEffect(() => {
        getCommunities()
    }, [])

    const communitiesList = communityList.map(community => {
        return (
            <li key={community.id} className="community-item">
                <Link to={`/communities/${community.id}`} className="community-link">
                    {community.communityName}
                </Link>
            </li>
        )
    })

    return (
        <div>
            <h1 className="page-title">Welcome To HOA Communities Message Board</h1>
            <div className="add-button-container">
                <Link to="/new-community" className="button add-button">
                    <h5>Add New Community</h5>
                </Link>
            </div>
            <ul className="community-list">
                {communitiesList}
            </ul>
        </div>
    )
}
export default CommunityList