import { Context } from "hono"
import { protectedRoutes } from "../utils/protectedRoutes"
import { getAdmin } from "../services/admin/getAdmin"

// Middleware for checking authentication
export const adminAuthMiddleware = async (context: Context, next: Function) => {

    const authToken = context.req.header('Authorization')
    const url = new URL(context.req.url)
    
    // Checking if the route is not protected 
    const isProtectedRoute = protectedRoutes.some((protectedRoute) => url.pathname.includes(protectedRoute))
    if(!isProtectedRoute) return next()

    if(!authToken){
        context.status(401)
        return context.json({success: false, error: "Unautherized admin"})
    }

    const result = await getAdmin(authToken)

    if(!result.success || result?.user?.role !== "ADMIN" || !result?.user){
        context.status(401)
        return context.json({success: false, error: "Unautherized admin"})
    }

    // Storing admin details
    context.set("admin", result.user)
    return next()

}