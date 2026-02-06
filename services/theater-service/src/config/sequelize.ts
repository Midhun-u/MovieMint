import { Sequelize } from "sequelize";
import { envVariables } from "../utils/envVariables";

export const sequelize = new Sequelize({
    dialect: "postgres",
    database: envVariables.DB_DATABASE_NAME,
    username: envVariables.DB_USERNAME,
    password: envVariables.DB_PASSWORD,
    port: envVariables.DB_PORT,
    host: envVariables.DB_HOST,
    logging: false
})

// Function for connecting database
export const connectDatabase = async () => {

    try {

        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log(`Database is connected`) 
        
    } catch (error) {
        console.log(`Database is not connected due to: ${error}`)
    }

}