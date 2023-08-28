import { Community, User } from "../../models/index.js";
class CommunitySeeder {
    static async seed() {
        const communityData = [
            {
                communityName:"Sunset Heights",
                description: "Come home to convenient living at Sunset Heights Apartments. Enjoy life on beautiful tree-lined streets, with easy access to transportation, shopping, and entertainment. Choose from a variety of spacious apartments, each with ample closet space and modern amenities. Sunset Heights Apartments is right where you want to be.",
                town: "Norwood",
                state: "MA",
                image:"https://my-first-app-production.s3.amazonaws.com/community3.jpeg"
            },
            {
                communityName:"Windsor Gardens",
                description: "The Commons at Windsor Gardens offers unique townhomes and apartments twenty-five miles south of Boston. Enjoy generous community amenities like an on-site MBTA station, swimming pool, volleyball courts, a dog park, and playgrounds.",
                town: "Quincy",
                state: "CT",
                image: "https://my-first-app-production.s3.amazonaws.com/community3.jpeg"
            },
            {
                communityName:"Green Meadows" ,
                description: "A community for residents of Green Meadows",
                town: "Natick",
                state: "ME",
                image: "https://my-first-app-production.s3.amazonaws.com/community3.jpeg"
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
    

