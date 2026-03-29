import { type Context, type Next } from "hono"
import { getAuthProfile } from "../services/getAuthProfile.js"
import { protectedRoutes } from "../utils/protectedRoutes.js"

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

    if (!result?.success || !result?.user) {
        context.status(403)
        return context.json({ success: false, error: "Only authenticated user has the access", statusCode: 403 })
    }

    context.set("auth", result.user)
    return next()

}