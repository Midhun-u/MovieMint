import { type Context, type Next } from "hono"
import { getAuthProfile } from "../services/getAuthProfile.js"

export const auth = async (context: Context, next: Next, protectedRoutes: Array<string>, role: "ADMIN" | "USER" | "THEATER_OWNER") => {

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

    if (role === "USER") {

        if (!result?.success || !result?.user) {
            context.status(403)
            return context.json({ success: false, error: "Only authenticated user has the access", statusCode: 403 })
        }

    } else {

        if (!result?.success || !result?.user || result.user?.role !== role) {
            context.status(403)
            return context.json({ success: false, error: "Only permitted roles have the access", statusCode: 403 })
        }

    }

    context.set("auth", result.user)
    return next()

}