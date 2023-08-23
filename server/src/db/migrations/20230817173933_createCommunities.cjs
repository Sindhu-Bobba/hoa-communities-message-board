/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("communities", (table)=>{
        table.bigIncrements("id")
        table.string("communityName").notNullable()
        table.string("description").notNullable()
        table.string("town").notNullable().unique()
        table.string("state").notNullable()
        table.string("image")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("communities")
}