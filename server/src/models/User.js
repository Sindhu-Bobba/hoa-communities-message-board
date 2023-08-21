/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userName", "firstName", "lastName", "email"],
      properties: {
        userName: { type: "string", maxLength: 36 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Post, UserCommunity, Community } = require("./index.js")
    return {
      posts: {
        relation : Model.HasManyRelation,
        modelClass:Post,
        join: {
          from: "users.id",
          to: "posts.userId"
        }
      },
      communities:{
        relation: Model.ManyToManyRelation,
        modelClass: Community,
        join: {
          from: "users.id",
          through: {
            from: "userCommunities.userId",
            to: "userCommunities.communityId"
          },
          to: "communities.id"
        }
      },
      userCommunities: {
        relation: Model.HasManyRelation,
        modelClass: UserCommunity,
        join: {
          from: "users.id",
          to: "userCommunities.userId"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
