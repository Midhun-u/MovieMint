import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { TheaterImageModel } from "../models/theaterImage.model.js";

// Controller for getting theater image
export const getTheaterImageController = handleError(async (request: Request, response: Response) => {

    const {theaterId} = request.params
   
    if(!theaterId){
        return sendResponse(response, false, 400, "Theater id is missing")
    }

    const theaterImage = await TheaterImageModel.getImageByTheaterId(theaterId, ["id", "image_url", "theater_id"])
   
    if(theaterImage){
        return sendResponse(response, true, 200, null, theaterImage)
    }

    return sendResponse(response, false, 404, "Theater image is not found")

}, "getTheaterImageContorller error")