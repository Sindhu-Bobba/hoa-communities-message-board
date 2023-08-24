import { Community, User } from "../../models/index.js";
class CommunitySeeder {
    static async seed() {
        const communityData = [
            {
                communityName:"Sunset Heights",
                description: "A community for residents of Sunset Heights",
                town: "Norwood",
                state: "MA",
                image:"https://my-first-app-production.s3.amazonaws.com/community3.jpeg"
            },
            {
                communityName:"Windsor Gardens",
                description: "A community for residents of Windsor Gardens",
                town: "Quincy",
                state: "CT",
                image: "https://my-first-app-production.s3.amazonaws.com/building.jpeg"

            },
            {
                communityName:"Green Meadows" ,
                description: "A community for residents of Green Meadows",
                town: "Natick",
                state: "ME"
            }
        ]
        for (const singleCommunity of communityData) {
            const currentCommunity = await Community.query().findOne({ communityName: singleCommunity.communityName })
            if (!currentCommunity) {
                await Community.query().insert(singleCommunity);
            }
        }
    }
}
export default CommunitySeeder
    

