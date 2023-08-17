import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "ksiri@email.com",
                cryptedPassword: "hajfsafhqwuiwyrow8qripqw",
                userName: "ksiri",
                firstName: "Siri",
                lastName: "k"
            },
            {
                email: "kraksha@email.com",
                cryptedPassword: "sfgasjhfjsk",
                userName: "kraksha",
                firstName: "Raksha",
                lastName:"k"

            }
        ]
        for (const singleUser of userData) {
            const currentUser = await User.query().findOne({ email: singleUser.email })
            if (!currentUser) {
                await User.query().insert(singleUser)
            }
        }
    }
}
export default UserSeeder