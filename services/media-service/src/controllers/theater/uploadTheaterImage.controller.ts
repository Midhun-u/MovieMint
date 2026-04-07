import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { deleteFileFromDisk, readFileFromDisk } from "../../utils/fileOperations.js";
import { TheaterImageModel } from "../../models/theaterImage.model.js";
import path from 'path'
import { uploadImage } from "../../supabase/uploadImage.js";
import type { ContentType } from "../../types/imageType.js";
import { getImage } from "../../supabase/getImage.js";

// Controller for uploading theater image
export const uploadTheaterImageController = handleError(async (request: Request, response: Response) => {

    const {theaterId} = request.body as {theaterId: string} || {}
    const file = request.file

    if(!theaterId || !file){

        if(file){

            // Deleting file from disk
            await deleteFileFromDisk(file.path)

        }

        return sendResponse(response, false, 400, "All fields are required")
    }

    // Checking if theater image is already exist or not
    const theaterImage = await TheaterImageModel.getImageByTheaterId(theaterId)
    if(theaterImage){

        // Deleting file from disk
        deleteFileFromDisk(file.path)

        return sendResponse(response, false, 409, "Theater image is already exist")
    }

    const fileBuffer = await readFileFromDisk(file.path)
    const extname = path.extname(file.path)

    // Uploading image to supabase
    const {data, error} = await uploadImage({
        id: theaterId,
        extname: extname,
        file: fileBuffer,
        bucketName: "theaters",
        path: file.path,
        contentType: `image/${extname.replace(".", "")}` as ContentType
    })

    if(!data || error){
        return sendResponse(response, false, 502, "Image couldn't upload")
    }

    // Getting image from supabase
    const {error: getImageError, publicUrl} = await getImage(data.path, "theaters")

    if(getImageError || !publicUrl){
        return sendResponse(response, false, 502 , "Couldn't get the image")
    }

    const newTheaterImage = await TheaterImageModel.addImage({
        theaterId: theaterId,
        imageUrl: publicUrl,
        imageFullPath: data.fullPath,
        imagePath: data.path,
        imageType: `image/${extname.replace(".", "")}` as ContentType
    })

    if(newTheaterImage){
        return sendResponse(response, true, 201, null, {image: newTheaterImage}, "Image is uploaded")
    }else{
        return sendResponse(response, false, 400, "Image couldn't created")
    }

}, "uploadTheaterImageController error ")