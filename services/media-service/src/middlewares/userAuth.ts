import type { NextFunction, Request, Response } from "express";
import { auth } from "./auth.js";

// Middleware for checking authentication
export const userAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    return await auth(request, response, next, ["USER"])

}