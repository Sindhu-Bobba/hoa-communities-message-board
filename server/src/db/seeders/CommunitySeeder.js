import { Community } from "../../models/index.js";
class CommunitySeeder {
    static async seed() {
        const communityData = [
            {
                communityName:"Sunset Heights",
                description: "A community for residents of Sunset Heights"
            },
            {
                communityName:"Windsor Gardens",
                description: "A community for residents of Windsor Gardens"
            },
            {
                communityName:"Green Meadows" ,
                description: "A community for residents of Green Meadows"
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
    

