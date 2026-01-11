import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import type { ContentType, UploadImageBody } from "../types/imageType.js";
import { sendResponse } from "../utils/sendResponse.js";
import { uploadImage } from "../utils/uploadImage.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import path from 'path'
import { ImageModel } from "../models/image.model.js";

// Controller for uploading user images
export const uploadUserImageController = handleError(async (request: Request, response: Response): Promise<any> => {

    const { userId , imageUrl} = request.body as UploadImageBody || {}

    if (!userId) {

        if (request.file) {

            // Deleting file
            deleteFileFromDisk(request.file.path as string)

        }

        return sendResponse(response, false, 400, "All fields are required")
    }

    if (!request.file && !imageUrl) {
        return sendResponse(response, false, 400, "File is required")
    }

    if(imageUrl){

        // Fetching image to know the mime type
        const fetchResponse = await fetch(imageUrl)
        const data = await fetchResponse.headers.get("Content-type")

        const newImage = await ImageModel.addImage({
            userId: userId,
            imageUrl: imageUrl,
            imageType: data as ContentType || "image/jpeg"
        })

        return sendResponse(response, true, 201, null, {newImage: newImage}, "Image is created")

    }else if(request.file){

        const fileBuffer = readFileFromDisk(request.file.path as string)
        const extname = path.extname(request.file.path)
    
        // Uploading image to supabase
        const result = await uploadImage(userId, request.file.path, extname, fileBuffer, request.file.mimetype as ContentType)
        console.log(result.data)

    }else{
        return sendResponse(response, false, 400, "Something went wrong")
    }


}, "uploadUserImageController error")