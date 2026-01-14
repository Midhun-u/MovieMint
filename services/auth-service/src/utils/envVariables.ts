import 'dotenv/config'

// ENV variables
export const envVariables = {
    PORT: process.env.PORT,
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME as string as string,
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: process.env.DB_PORT as string,
    ADMIN_KEY: process.env.ADMIN_KEY as string,
    CLIENT_URL: process.env.CLIENT_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    UPLOAD_IMAGE_BASE_URL: process.env.UPLOAD_IMAGE_BASE_URL as string,
    NODEMAILER_GMAIL_APP_PASSWORD: process.env.NODEMAILER_GMAIL_APP_PASSWORD as string,
    NODEMAILER_GMAIL_USER_EMAIL: process.env.NODEMAILER_GMAIL_USER_EMAIL as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number(process.env.REDIS_PORT)
}