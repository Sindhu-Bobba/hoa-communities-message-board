import express from "express"
import { Post } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";

const postRouter = new express.Router()

postRouter.get("/:communityid/posts", async (req, res) => {

    try {
        console.log(":::::::::::::");
        const { communityid } = req.params;
        const post = await Post.query().where('communityId', communityid);
        return res.status(200).json({ posts: post })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: err })
    }
})

postRouter.post("/:communityid/posts/:userid", uploadImage.single("image"), async (req, res) => {
    try {
        const { communityid, userid } = req.params;
        console.log(communityid + " ::::: " + userid);
        const { body } = req;
        const formInput = cleanUserInput(body);
        const data = {
            ...formInput,
            image: req.file?.location,
            userId: userid,
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

postRouter.delete("/:communityid/posts/:id", async (req, res) => {
    const postId = req.params.id;
    const { communityid } = req.params.communityId;
    try {
        const post = await Post.query().findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'post not found' });
        }
        if (post.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this post' });
        }
        await post.$query().delete();
        res.json({ message: 'post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
});
export default postRouter