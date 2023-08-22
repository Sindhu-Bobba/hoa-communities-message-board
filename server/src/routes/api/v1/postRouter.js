import express from "express"
import { Post } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";

const postRouter = new express.Router()

postRouter.get("/:communityid/posts", async (req, res) => {
    
    try {
        console.log(":::::::::::::");
        const {communityid }= req.params;
        const post = await Post.query().where('communityId', communityid);
      return res.status(200).json({ post: post })
    }
    catch (err) {
        console.log(err);
      return res.status(500).json({ errors: err })
    }
  })

postRouter.post("/:communityid/posts/:userid", uploadImage.single("image"), async (req, res) => {
    try {
        const {communityid, userid }= req.params;
        console.log(communityid +" ::::: " + userid);
        const { body } = req;
        const formInput = cleanUserInput(body);
        const data = {
            ...formInput,
            image: req.file?.location,
            userId : userid,
            communityId: communityid
        };
        const newPost = await Post.query().insertAndFetch(data);
        console.log(data)
        res.status(201).json({ post: newPost });
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
});
export default postRouter