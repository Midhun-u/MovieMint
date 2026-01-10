import { Sequelize } from "sequelize";
import { envVariables } from "../utils/envVariables.js";

// Sequelize configuration
export const sequelize = new Sequelize({
    dialect: "postgres",
    database: envVariables.DB_DATABASE_NAME,
    username: envVariables.DB_USERNAME,
    password: envVariables.DB_PASSWORD,
    host: envVariables.DB_HOST,
    port: Number(envVariables.DB_PORT),
    logging: false
})

export const connectDatabase = async () => {

    try {
        
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log(`Database is conncted`)

    } catch (error) {
        console.error(`Database is not connected: ${error}`)
    }

}