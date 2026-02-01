import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";

// Controller for uploading movie poster
export const uploadMoviePosterController = handleError(async (request: Request, response: Response) => {

    console.log(request.file)
    return sendResponse(response, true, 200, null, null, "Hello world")

}, "uploadMoviePosterController error")