const Model = require("./Model.js")

class Community extends Model {
    static get tableName() {
        return "communities"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["communityName", "description"],
            properties: {
                communityName: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}
module.exports = Community