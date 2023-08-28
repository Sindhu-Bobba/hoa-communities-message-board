import express from "express"
import Objection from "objection";
import { Post,Community,User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";

const communityPostRouter = new express.Router({ mergeParams: true })


communityPostRouter.post("/", async (req, res) => {
  const { body } = req
    const formData = cleanUserInput(body)
    formData.communityId = req.params.communityId
    formData.userId = req.user.id

  try {
    console.log(":::::::::::::" +(req.user.id));
    const newPost = await Post.query().insertAndFetch(formData)
    return res.status(201).json({newPost: newPost })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})


export default communityPostRouter