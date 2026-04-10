import type { NextFunction, Request, Response } from "express"
import { getAuthProfile } from "../services/getAuthProfile.js"
import { sendResponse } from "../utils/sendResponse.js"

export const auth = async (request: Request, response: Response, next: NextFunction, roles: Array<"ADMIN" | "USER" | "THEATER_OWNER">) => {

    try {

        const authToken = request.headers.authorization

        if (!authToken) {
            return sendResponse
                (response, false, 401, "Unauthorized user")
        }

        const result = await getAuthProfile(authToken)

        if (roles.includes("USER")) {
            if (!result.success || !result?.user) {
                return sendResponse(response, false, 403, "Only authenticated user has the access for processing")
            }
        } else {
            if (!result.success || !result?.user || !roles.includes(result?.user.role)) {
                return sendResponse(response, false, 403, "Only permitted role has the access for processing")
            }
        }

        request.user = result.user
        return next()

    } catch (error) {
        return sendResponse(response, false, 500, "Server error")
    }

}