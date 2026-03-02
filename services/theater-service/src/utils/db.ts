import { connectToMongodbDatabase } from "../config/mongodb"
import { connectToPostgresDatabase } from "../config/sequelize"

// Function for connecting databases
export const connectDatabase = async () => {
    await Promise.all([
        connectToPostgresDatabase(),
        connectToMongodbDatabase()
    ])
}