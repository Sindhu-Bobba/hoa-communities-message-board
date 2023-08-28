import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "./layout/ErrorList.js"
import translateServerErrors from "../services/translateServerErrors.js"
import Dropzone from "react-dropzone";

const CommunityForm = (props) => {
    const [communityRecord, setCommunityRecord] = useState({
        communityName: "",
        description: "",
        image: "",
        town: "",
        state: "",

    })
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewCommunity = async (newCommunity) => {
        const communityFormData = new FormData()
        communityFormData.append("communityName", communityRecord.communityName);
        communityFormData.append("description", communityRecord.description);
        communityFormData.append("image", communityRecord.image);
        communityFormData.append("town", communityRecord.town);
        communityFormData.append("state", communityRecord.state);

        try {
            const response = await fetch(`/api/v1/communities`, {
                method: "POST",
                headers: {
                    "Accept": "image/jpeg"
                },
                body: communityFormData
            })

            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.error)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw (error)
                }
            } else {
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

    const handleImageUpload = (acceptedSiteImage) => {
        setCommunityRecord({
            ...communityRecord,
            image: acceptedSiteImage[0],
        });
    };

    return (
        <div className="container">
            <div className="container__row">
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2>Add New Community</h2>
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
                        <label htmlFor="town">
                            City/Town:
                            <textarea
                                id="town"
                                name="town"
                                onChange={handleChange}
                                value={communityRecord.town}
                            />
                        </label>
                        <label htmlFor="state">
                            State:
                            <textarea
                                id="state"
                                name="state"
                                onChange={handleChange}
                                value={communityRecord.state}
                            />
                        </label>

                        <Dropzone onDrop={handleImageUpload}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="button">Add Community Picture (optional)</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                        <input type="submit" value="Create Community" className="button" />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CommunityForm