const Model = require("./Model")

class UserCommunity extends Model {
  static get tableName() {
    return "userCommunities"
  }
  static get relationMappings() {
    const { User, Community } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "userCommunities.userId",
          to: "users.id"
        }
      },
     community: {
        relation: Model.BelongsToOneRelation,
        modelClass: Community,
        join: {
          from: "userCommunities.communityId",
          to: "communities.id"

        }
      }
    }
  }
}

module.exports = UserCommunity