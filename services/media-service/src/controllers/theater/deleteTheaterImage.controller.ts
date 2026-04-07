import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { TheaterImageModel } from "../../models/theaterImage.model.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { deleteImage } from "../../supabase/deleteImage.js";

// Controller for deleting theater image
export const deleteTheaterImageController = handleError(async (request: Request, response: Response) => {

    const {theaterId} = request.params

    if(!theaterId){
        return sendResponse(response, false, 400, "Theater id is missing")
    }
    
    const theaterImage = await TheaterImageModel.getImageByTheaterId(theaterId)
    if(!theaterImage){
        return sendResponse(response, false, 404, "Theater image is not found")
    }
   
    // // Deleting image from supabase
    const {data, error} = await deleteImage(theaterImage.image_path, "theaters")

    if(error || !data){
        return sendResponse(response, false, 502, "Theater image couldn't delete")
    }

    const deletedCount = await TheaterImageModel.deleteImageById(theaterImage.id)
    if(!deletedCount){
        return sendResponse(response, false, 400, "Theater image couldn't delete")
    }

    return sendResponse(response, true, 200, null, null, "Theater image is deleted")

}, "deleteTheaterController error")