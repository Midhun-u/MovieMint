import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { deleteFileFromDisk, readFileFromDisk } from "../../utils/fileOperations.js";
import { ActorImageModel } from "../../models/actorImage.model.js";
import { uploadImage } from "../../supabase/uploadImage.js";
import path from 'path'
import type { ContentType } from "../../types/imageType.js";
import { getImage } from "../../supabase/getImage.js";

// Controller for uploading actor image
export const uploadActorImageController = handleError(async (request: Request, response: Response) => {

    const { actorId, movieId } = request.body as { actorId: string, movieId: string } || {}
    const file = request.file

    if (!actorId || !movieId || !file) {

        if (file) {
            // Deleting file from disk
            deleteFileFromDisk(file.path)
        }

        return sendResponse(response, false, 400, "All fields are required")

    }

    // Checking if actor image already exists
    const actorImage = await ActorImageModel.getActorImageByActorId(actorId)
   
    if (actorImage) {

        // Deleting file from disk
        deleteFileFromDisk(file.path)
        
        return sendResponse(response, false, 409, "Actor image is already exists")
    }

    // Uploading actor image to supabase
    const fileBuffer = await readFileFromDisk(file.path)
    const extname = path.extname(file.path)
    const {data, error} = await uploadImage({
        id: `${actorId}` + '-' + `${movieId}`,
        file: fileBuffer,
        extname: extname,
        path: file.path,
        bucketName: "actors",
        contentType: `image/${extname.replace(".", "")}` as ContentType
    })

    if(error || !data){
        return sendResponse(response, false, 502, "Couldn't upload the image")
    }

    const {error: getImageError, publicUrl} = await getImage(data.path, "actors")

    if(getImageError || !publicUrl){
        return sendResponse(response, false, 502, "Couldn't get the image")
    }

    const newActorImage = await ActorImageModel.addActorImage({
        actorId: actorId,
        movieId: movieId,
        imageUrl: publicUrl,
        imageFullPath: data.fullPath,
        imagePath: data.path,
        imageType: `image/${extname.replace(".", "")}` as ContentType,
    })

    if(newActorImage){
        return sendResponse(response, true, 201, null, newActorImage, "Image is uploaded")
    }

    return sendResponse(response, false, 500, "Something went wrong")

}, "uploadActorImageController error")