import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import type { ContentType, UploadImageBody } from "../types/imageType.js";
import { sendResponse } from "../utils/sendResponse.js";
import { uploadImage } from "../utils/uploadImage.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import path from 'path'

// Controller for uploading user images
export const uploadUserImageController = handleError(async (request: Request, response: Response): Promise<any> => {

    const { userId, imageUrl } = request.body as UploadImageBody || {}

    if (!userId) {

        if (request.file) {

            // Deleting file
            deleteFileFromDisk(request.file.path as string)

        }

        return sendResponse(response, false, 400, "All fields are required")
    }

    if (!request.file) {
        return sendResponse(response, false, 400, "File is required")
    }

    const fileBuffer = readFileFromDisk(request.file.path as string)
    const extname = path.extname(request.file.path)

    // Uploading image to supabase
    const result = await uploadImage(userId, request.file.path, extname, fileBuffer, request.file.mimetype as ContentType)
    console.log(result.data)


}, "uploadUserImageController error")