import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import type { ContentType, UploadImageBody } from "../types/imageType.js";
import { sendResponse } from "../utils/sendResponse.js";
import { uploadImage } from "../supabase/uploadImage.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import path from 'path'
import { UserImageModel } from "../models/userImage.model.js";
import { getImage } from "../supabase/getImage.js";

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

    if (!request.file && !imageUrl) {
        return sendResponse(response, false, 400, "File is required")
    }

    if (imageUrl) {

        // Fetching image for knowing the mime type
        const fetchResponse = await fetch(imageUrl)
        const data = await fetchResponse.headers.get("Content-type")

        const newImage = await UserImageModel.addImage({
            userId: userId,
            imageUrl: imageUrl,
            imageType: data as ContentType || "image/jpeg"
        })

        return sendResponse(response, true, 201, null, { newImage: newImage }, "Image is uploaded")

    } else if (request.file) {

        // Reading file from disk
        const fileBuffer = readFileFromDisk(request.file.path as string)
        const extname = path.extname(request.file.path)

        // Uploading image to supabase
        const result = await uploadImage({
            id: userId,
            path: request.file.path,
            extname: extname,
            file: fileBuffer,
            bucketName: "users",
            contentType: request.file.mimetype as ContentType
        })

        if (result.error) {
            return sendResponse(response, false, 400, "Couldn't upload the image")
        }

        // Getting public url
        const data = await getImage(result.data?.path as string, "users")

        if (data.error) {
            return sendResponse(response, false, 400, "Couldn't get the public url")
        }

        const newImage = await UserImageModel.addImage({
            userId: userId,
            imageUrl: data.publicUrl as string,
            imageFullPath: result.data?.fullPath as string,
            imagePath: result.data?.path as string,
            imageType: `image/${extname.replace(".", "")}` as ContentType // eg: ".jpg" to "jpg"
        })

        return sendResponse(response, true, 201, null, {image: newImage }, "Image is uploaded")

    } else {
        return sendResponse(response, false, 400, "Something went wrong")
    }


}, "uploadUserImageController error")