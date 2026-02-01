import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.js";

// Controller sending response when route is not found
export const notFoundController = async (request: Request, response: Response, next: NextFunction) => {

    return sendResponse(response, false, 404, "Route is not found")

}