// For env variables
export const envVariables = {
    AUTH_URL: process.env.AUTH_URL as string,
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    ADMIN_DASHBOARD_URL: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL as string,
    THEATER_DASHBAORD_URL: process.env.NEXT_PUBLIC_THEATER_DASHBOARD_URL as string,
    THEATER_URL: process.env.THEATER_URL as string,
    MEDIA_URL: process.env.MEDIA_URL as string
}