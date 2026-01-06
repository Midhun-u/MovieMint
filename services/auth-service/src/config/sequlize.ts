import { Sequelize } from "sequelize";

// Sequelize configuration
export const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DB_DATABASE as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
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