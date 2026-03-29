import { Context, Next } from "hono"
import { permittedProtectedRoutes } from "../utils/permittedProtectedRoutes"
import { permittedRoles } from "../utils/permittedRoles"
import { auth } from "./auth"

// Middleware for checking authentication
export const permittedAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(
        context,
        next,
        permittedProtectedRoutes,
        permittedRoles,
        "Only permitted roles have the access"
    )

}