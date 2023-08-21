const Model = require("./Model.js")

class Community extends Model {
    static get tableName() {
        return "communities"
    }
    static get relationMappings() {
        const { User, UserCommunity, Post } = require("./index.js")
        return {
            posts:{
                relation:Model.HasManyRelation,
                modelClass: Post,
                join:{
                    from: "communities.postId",
                    to: "posts.communityId"
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "communities.id",
                    through:{
                        from: "userCommunities.communityId",
                        to: "userCommunities.userId"
                    },
                    to: "users.id"
                }
            },
            userCommunity: {
                relation: Model.HasManyRelation,
                modelClass: UserCommunity,
                join: {
                    from: "communities.id",
                    to:"userCommunities.communityId"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["communityName", "description","town","state"],
            properties: {
                communityName: { type: "string" },
                description: { type: "string" },
                town: { type: "string" },
                state:{ type: "string" }
            }
        }
    }
}
module.exports = Community