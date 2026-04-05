import type { Context, Next } from "hono";
import { auth } from "./auth.js";
import { adminProtectedRoutes } from "../utils/adminProtectedRoutes.js";

export const adminAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(context, next, adminProtectedRoutes, "ADMIN")

}