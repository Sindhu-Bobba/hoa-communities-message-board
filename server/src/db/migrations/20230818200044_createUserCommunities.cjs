/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("userCommunities", (table) =>{
        table.bigIncrements("id")
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("CommunityId").notNullable().unsigned().index().references("communities.id")
        table
            .timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table
            .timestamp("updatedAt")
            .notNullable()
            .defaultTo(knex.fn.now())

    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("userCommunities")
}
