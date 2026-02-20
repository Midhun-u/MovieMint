import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { BannerModel } from "../models/banner.model";

// Controller for getting banner
export const getBannerController = sendErrorResponse(async (context: Context) => {

    const {movieId} = context.req.param()
    
    if(!movieId){
        context.status(400)
        return context.json({success: false, error: "Movie id is required", statusCode: 400})
    }

    const banner = await BannerModel.getBannerByMovieId(movieId)
    return context.json({success: true, banner: banner, statusCode: 200})

}, "getBannerController error")