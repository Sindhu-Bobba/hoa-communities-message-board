// include all of your models here using CommonJS requires
const User = require("./User.js")
const Community = require("./Community.js")
const UserCommunity = require("./UserCommunity")
const Post = require("./Post.js")

module.exports = { User, Community, UserCommunity, Post };
