import { Context, Next } from "hono"
import { protectedRoutes } from "../utils/protectedRoutes"
import { getAuthProfile } from "../services/getAuthProfile"
import { permittedRoles } from "../utils/permittedRoles"

// Middleware for checking authentication
export const authMiddleware = async (context: Context, next: Next) => {

    const url = new URL(context.req.url)
    const authToken = context.req.header("Authorization")

    // Checking if currect route is procted or not
    const isProtected = protectedRoutes.some((route) => url.pathname.includes(route))

    if (!isProtected) {
        return next()
    }

    if (!authToken) {
        context.status(401)
        return context.json({ success: false, error: "Unauthorized user", statusCode: 401 })
    }

    // Fetching current user
    const result = await getAuthProfile(authToken)
    const isPermittedAccess = permittedRoles.some((role) => result?.user?.role.includes(role))

    if (!result?.success || !result?.user || !isPermittedAccess) {
        context.status(403)
        return context.json({ success: false, error: "Only permitted role have the access for processing", statusCode: 403 })
    }

    context.set("auth", result.user)
    return next()

}