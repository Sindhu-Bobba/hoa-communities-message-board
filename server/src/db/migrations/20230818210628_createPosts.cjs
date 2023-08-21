/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("posts", table => {
        table.bigIncrements("id")
        table.text("content").notNullable()
        table.text("postDate").notNullable()
        table.bigInteger("userId").notNullable().index().unsigned().references("users.id")
        table.bigInteger("communityId").notNullable().index().unsigned().references("communities.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("posts")
}