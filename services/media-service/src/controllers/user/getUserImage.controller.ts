import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserImageModel } from "../../models/userImage.model.js";

// Controller for getting user image
export const getUserImageController = handleError(async (request: Request, response: Response) => {

    const {userId} = request.params
   
    if(!userId){
        return sendResponse(response, false, 400, "User id is missing")
    }
   
    const userImage = await UserImageModel.getImageByUserId(userId, ["id", "image_url", "user_id"])
  
    return sendResponse(response, true, 200, null, {userImage: userImage || null})

}, "getUserImageController error")