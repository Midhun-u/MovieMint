import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { MoviePosterModel } from "../models/moviePoster.model.js";
import { MovieBannerModel } from "../models/movieBanner.model.js";

// Controller for getting movie image
export const getMovieImageController = handleError(async (request: Request, response: Response) => {

    const {type, movieId} = request.params as {type: "poster" | "bannner", movieId: string}
    
    if(!type || !movieId){
        return sendResponse(response, false, 400, "All fields are required")
    }

    if(type === "poster"){

        const poster = await MoviePosterModel.getPosterByMovieId(movieId)
        if(!poster){
            return sendResponse(response, false, 404, "Image is not found")
        }

        return sendResponse(response, true, 200, null, {
            id: poster.id,
            image_url: poster.image_url
        })

    }else{

        const banner = await MovieBannerModel.getBannerByMovieId(movieId)
        if(!banner){
            return sendResponse(response, false, 404, "Image is not found")
        }

        return sendResponse(response, true, 200, null, {
            id: banner.id,
            image_url: banner.image_url
        })

    }
    
}, "getMovieImageController error")