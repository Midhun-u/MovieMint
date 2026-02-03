import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { ActorImageModel } from "../models/actorImage.model.js";
import { deleteImage } from "../supabase/deleteImage.js";

// Controller for deleting actor image
export const deleteActorImageController = handleError(async (request: Request, response: Response) => {

    const {movieId} = request.params as {movieId: string} || {}
    
    if(!movieId){
        return sendResponse(response, false, 400, "All fields are required")
    }

    // Checking if actor images are exist
    const actorImages = await ActorImageModel.getActorImagesByMovieId(movieId)
    if(!actorImages.length) return sendResponse(response, false, 404, "No images were found")

    // Deleting images from supabase
    actorImages.map(async (actorImage: any) => {

        const {data, error} = await deleteImage(actorImage.image_path, "actors")

        if(!data || error) return sendResponse(response, false, 502, "Couldn't delete the images")

    })

    const deletedCount = await ActorImageModel.deleteActorImagesByMovieId(movieId)
    if(!deletedCount) return sendResponse(response, false, 400, "Couldn't delete the images")

    return sendResponse(response, true, 200, null, null, "Deleted actor images")

}, "deleteActorImageController error")