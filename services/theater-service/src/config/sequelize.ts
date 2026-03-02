import { Sequelize } from "sequelize";
import { envVariables } from "../utils/envVariables";

export const sequelize = new Sequelize({
    dialect: "postgres",
    database: envVariables.POSTGRES_DATABASE_NAME,
    username: envVariables.POSTGRES_USERNAME,
    password: envVariables.POSTGRES_PASSWORD,
    port: envVariables.POSTGRES_PORT,
    host: envVariables.POSTGRES_HOST,
    logging: false
})

// Function for connecting database
export const connectToPostgresDatabase = async () => {

    try {

        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log(`Postgres is connected`)
        
    } catch (error) {
        console.log(`Postgres is not connected due to: ${error}`)
    }

}