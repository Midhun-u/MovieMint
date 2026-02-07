import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.js";
import { getUser } from "../services/getUser.js";

// Middleware for checking authentication
export const theaterOwnerAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    try {

        const authToken = request.headers.authorization

        if (!authToken) {
            return sendResponse
            (response, false, 401, "Unauthorized user")
        }

        const result = await getUser(authToken)

        if (!result.success || !result.user || result.user?.role !== "THEATER_OWNER") {
            return sendResponse(response, false, 403, "Only theater owner has the access for processing")
        }

        return next()

    } catch (error) {
        return sendResponse(response, false, 500, "Server error")
    }

}