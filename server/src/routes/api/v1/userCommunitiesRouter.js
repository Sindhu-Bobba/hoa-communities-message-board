import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Community } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const userCommunitiesRouter = new express.Router({ mergeParams: true })
userCommunitiesRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { communityName, description } = formInput
    try {
        const newCommunity = await Community.query().insertAndFetch({ communityName, description })
        return res.status(201).json({community: newCommunity})
    }catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({errors: error})
    }
    

})
export default userCommunitiesRouter
