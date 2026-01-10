import 'dotenv/config'

// Env variables
export const envVariables = {
    PORT: Number(process.env.PORT),
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME as string,
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: Number(process.env.DB_PORT),
    DB_PASSWORD: process.env.DB_PASSWORD as string
}