const Model = require("./Model.js")

class Post extends Model {
    static get tableName() {
        return "posts"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["content", "postDate"],
            properties: {
                content: { type: "string" },
                postDate: { type: ["string", "integer"] },
                image: { type: "string" },
                userId: { type: ["string", "integer"] },
                communityId: {type: ["string", "integer"] }
            },
        }
    }
    static get relationMappings() {
        const { User, Community} = require("./index.js")
        return {
          users: {
            relation : Model.BelongsToOneRelation,
            modelClass:User,
            join: {
              from: "posts.userId",
              to: "users.id"
            }
          },
          communities: {
            relation: Model.BelongsToOneRelation,
            modelClass:Community,
            join: {
                from: "posts.communityId",
                to: "communities.id"
            }
          }
        }
      }

}
module.exports = Post