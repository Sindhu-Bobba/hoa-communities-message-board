/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import CommunitySeeder from "./seeders/CommunitySeeder.js"


class Seeder {
  static async seed() {
    console.log("Seeding users")
    await UserSeeder.seed()

    console.log("Seeding Communities")
    await CommunitySeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder