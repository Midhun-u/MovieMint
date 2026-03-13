import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { ActorImageModel } from "../models/actorImage.model.js";

// Contorller for getting actors images
export const getActorsImagesController = handleError(async (request: Request, response: Response) => {

    const {movieId} = request.params
    if(!movieId){
        return sendResponse(response, false, 400, "Movie id is required")
    }

    const images = await ActorImageModel.getActorImagesByMovieId(movieId)
   
    const actorImages = images.map((image: any) => {
        return {
            id: image.id,
            image_url: image.image_url,
            actor_id: image.actor_id
        }
    })

    return sendResponse(response, true, 200, null, {actorsImages: actorImages})

}, "getActorsImagesController error")