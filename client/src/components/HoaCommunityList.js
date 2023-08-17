import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


const HoaCommunityList = props => {
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
            <li key={community.id}>
                <Link to={`/communities/${community.id}`}>
                    {community.name}
                </Link>
            </li>
        )
    })

    return (
        <div>
            <h1>WElcome To HOA Communities Message Board</h1>
            <ul>
                {communitiesList}
            </ul>
        </div>
    )
}
export default HoaCommunityList