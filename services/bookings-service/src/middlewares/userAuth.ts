import type { Context, Next } from "hono";
import { auth } from "./auth.js";
import { userProtectedRoutes } from "../utils/userProtectedRoutes.js";

// Middleware for checking authentication
export const userAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(context, next, userProtectedRoutes, "USER")

}