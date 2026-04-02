import 'dotenv/config'

// Env variables
export const envVariables = {
    PORT: Number(process.env.PORT),
    DB_URL: process.env.DB_URL as string,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY as string,
    APP_URL: process.env.APP_URL as string,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL as string,
    REDIS_URL: process.env.REDIS_URL as string,
    MOVIE_SERVICE_URL: process.env.MOVIE_SERVICE_URL as string,
    THEATER_SERVICE_URL: process.env.THEATER_SERVICE_URL as string,
    SHOW_SERVICE_URL: process.env.SHOW_SERVICE_URL as string
}