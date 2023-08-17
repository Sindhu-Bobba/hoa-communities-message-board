import React, { useState, useEffect } from "react"

const CommunityShow = (props) => {
    const [community, setCommunity] = useState({
        communityName: "",
        description: ""
    })
    

    const communityId = props.match.params.id

    const getCommunity = async () => {
        try {
            const response = await fetch(`api/v1/communities/${communityId}`)
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
        <div>
            <div>
                <h3>{community.communityName}</h3>
                {community.description}
            </div>

        </div>

    )
    }
    export default CommunityShow