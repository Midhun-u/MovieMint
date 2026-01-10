import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import type { UploadImageBody } from "../types/uploadImageBody.js";
import { validateUploadImage } from "../utils/uploadImageValidator.js";

// Controller for uploading user images
export const uploadUserImageController = handleError(async (request: Request, response: Response): Promise<any> => {

    const {imageUrl, userId} = request.body as UploadImageBody || {}

    const result = await validateUploadImage(request.body)
    console.log(result)

}, "uploadUserImageController error")