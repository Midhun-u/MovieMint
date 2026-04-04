import type { Context, Next } from "hono";
import { auth } from "./auth.js";
import { theaterOwnerProtectedRoutes } from "../utils/theaterOwnerProtectedRoutes.js";

// Middleware for checking authentication
export const theaterOwnerAuthMiddleware = async (context: Context, next: Next) => {

    return await auth(context, next, theaterOwnerProtectedRoutes, "THEATER_OWNER")

}