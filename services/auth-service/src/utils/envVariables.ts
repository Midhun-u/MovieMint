import 'dotenv/config'

// ENV variables
export const envVariables = {
    PORT: process.env.PORT,
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    ADMIN_KEY: process.env.ADMIN_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    JWT_SECRET: process.env.JWT_SECRET
}