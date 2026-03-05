import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import { TheaterImageModel } from "../models/theaterImage.model.js";
import path from 'path'
import type { ContentType } from "../types/imageType.js";
import { updateImage } from "../supabase/updateImage.js";

// Controller for updating theater image
export const updateTheaterImage = handleError(async (request: Request, response: Response) => {

    const file = request.file
    const { theaterId } = request.params

    if (!theaterId || !file) {

        if (file) {
            // Deleting image from disk
            deleteFileFromDisk(file.path)
        }

        return sendResponse(response, false, 400, "All fields are required")
    }

    // Checking if theater image exists
    const theaterImage = await TheaterImageModel.getImageByTheaterId(theaterId)
    if (!theaterImage) {
        // Deleting file from disk
        await deleteFileFromDisk(file.path)

        return sendResponse(response, false, 404, "Image is not found")
    }

    const fileBuffer = await readFileFromDisk(file.path)
    const contentType = `image/${path.extname(file.path).replace(".", "")}`

    const { data, error } = await updateImage(
        theaterImage.image_path,
        "theaters",
        fileBuffer,
        file.path,
        contentType as ContentType
    )

    if(error || !data){
        return sendResponse(response, false, 502, "Image couldn't update")
    }

    return sendResponse(response, true, 200, null, null, "Image is updated")

}, "updateTheaterImage error")