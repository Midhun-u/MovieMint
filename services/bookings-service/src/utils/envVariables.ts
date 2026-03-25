import 'dotenv/config'

// Env variables
export const envVariables = {
    PORT: Number(process.env.PORT),
    DB_URL: process.env.DB_URL as string
}