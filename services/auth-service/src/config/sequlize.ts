import { Sequelize } from "sequelize";
import { envVariables } from "../utils/envVariables.js";

// Sequelize configuration
export const sequelize = new Sequelize({
    dialect: "postgres",
    database: envVariables.DB_DATABASE_NAME as string,
    username: envVariables.DB_USERNAME as string,
    password: envVariables.DB_PASSWORD as string,
    host: envVariables.DB_HOST as string,
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