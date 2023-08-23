import { Post, User, Community } from "../../models/index.js"

class Postseeder {
    static async seed() {
        const siri = await User.query().findOne({firstName: "Siri"});
        console.log("siri:", siri);
        const raksha = await User.query().findOne({firstName: "Raksha"});

        const postData = [
            {
                title: "About Gardening",
                content: "I'm passionate about gardening. Let's discuss the best practices for growing beautiful and healthy flowers.",
                postDate: "2022-12-10",
                userId: siri.id,
                communityId: siri.id
            },
            {
                title:"about Art",
                content: "Share your latest artwork inspired by culture, whether it's paintings, crafts, or music.",
                postDate: "2023-10-22",
                userId: raksha.id,
                communityId: raksha.id

            }
        ]
        for (const singlePostData of postData) {
            const currentPost = await Post.query().findOne(singlePostData)
            if (!currentPost) {
                await Post.query().insert(singlePostData)
            }
        }

    }
}
export default Postseeder