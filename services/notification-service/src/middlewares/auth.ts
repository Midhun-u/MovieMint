import { Context, Next } from "hono";
import { getAuthProfile } from "../services/getAuthProfile";
import  {protectedRoutes} from '../utils/protectedRoutes'

// Middleware for checking authentication
export const authMiddleware = async (context: Context, next: Next) => {

    const authToken = context.req.header('Authorization')
    const url = new URL(context.req.url)

    // Checking if the route is not protected 
    const isProtectedRoute = protectedRoutes.some((protectedRoute) => url.pathname.includes(protectedRoute))
    if (!isProtectedRoute) return next()

    if (!authToken) {
        context.status(401)
        return context.json({ success: false, error: "Unautherized user", statusCode: 401 })
    }

    try {

        const result = await getAuthProfile(authToken)

        if (!result.success || !result?.user) {
            context.status(403)
            return context.json({ success: false, error: "Can't proceed", statusCode: 403 })
        }

        // Storing user details
        context.set("user", result.user)
        return next()

    } catch (error) {
        context.status(500)
        return context.json({ success: false, error: "Something went wrong", statusCode: 500 })
    }


}