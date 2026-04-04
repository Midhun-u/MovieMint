import { Context, Next } from "hono"
import { adminProtectedRoutes } from "../utils/adminProtectedRoutes"
import { auth } from "./auth"

// Middleware for checking admin authentication
export const adminAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(
        context,
        next,
        adminProtectedRoutes,
        "ADMIN",
        "Only permitted roles have the access"
    )

}