export interface UserPayload {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    auth_type: string
    role: "ADMIN" | "USER" | "THEATER_OWNER",
    profile_image: {
        id?: string
        image_url?: string
    }
}

declare module "express-serve-static-core"{
    interface Request {
        user?: UserPayload
    }
}