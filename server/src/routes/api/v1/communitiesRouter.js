import express from "express"
import { Community } from "../../../models/index.js"

const communitiesRouter = new express.Router()
communitiesRouter.get("/", async (req,res) => {
    try{
        const communities = await Community.query()
        return res.status(200).json({communityList: communities})
    } catch(error) {
        return res.status(500).json({ errors:error })
    }
})
export default communitiesRouter