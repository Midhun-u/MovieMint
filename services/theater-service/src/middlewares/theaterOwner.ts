import { Context, Next } from "hono"
import { auth } from "./auth"
import { theaterOwnerProtectedRoutes } from "../utils/theaterOwnerProtectedRoutes"

// Middleware for checking authentication
export const theaterOwnerAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(
        context,
        next,
        theaterOwnerProtectedRoutes,
        "THEATER_OWNER",
        "Only permitted roles have the access"
    )

}