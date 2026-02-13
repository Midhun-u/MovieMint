import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.js";
import { getAuthProfile } from "../services/getAuthProfile.js";
import { permittedRoles } from "../utils/permittedRoles.js";

// Middleware for checking authentication
export const theaterOwnerAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    try {

        const authToken = request.headers.authorization

        if (!authToken) {
            return sendResponse
            (response, false, 401, "Unauthorized user")
        }

        const result = await getAuthProfile(authToken)

        const isPermittedAccess = permittedRoles.some((role) => result.user.role.includes(role))

        if (!result.success || !result.user || !isPermittedAccess) {
            return sendResponse(response, false, 403, "Only permitted roles have the access for processing")
        }

        return next()

    } catch (error) {
        return sendResponse(response, false, 500, "Server error")
    }

}