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
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY as string,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN as string,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID as string,
    UPLOAD_IMAGE_BASE_URL: process.env.UPLOAD_IMAGE_BASE_URL as string,
}