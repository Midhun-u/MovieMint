import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";

// Controller for updating user image
export const updateUserImageController = handleError(async (request: Request, response: Response) => {

    const file = request.file

}, "updateUserImageController error")