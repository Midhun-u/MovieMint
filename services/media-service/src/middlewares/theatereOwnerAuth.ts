import type { NextFunction, Request, Response } from "express";
import { auth } from "./auth.js";

// Middleware for checking theater owner authentication
export const theaterOwnerAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    return await auth(request, response, next, "THEATER_OWNER")

}