import { Context, Next } from "hono"
import { userProtectedRoutes } from "../utils/userProtectedRoutes"
import { auth } from "./auth"

// Middleware for checking authentication
export const userAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(
        context,
        next,
        userProtectedRoutes,
        ["USER"],
        "Only authenticated user has the access"
    )

}