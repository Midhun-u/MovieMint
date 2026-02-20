import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { BannerModel } from "../models/banner.model";

// Controller for removing banner
export const removeBannerController = sendErrorResponse(async (context: Context) => {

    const {id} = context.req.param()

    if(!id){
        context.status(400)
        return context.json({success: false, error: "Id is required", statusCode: 400})
    }

    const banner = await BannerModel.getBannerById(id)
    if(!banner){
        context.status(404)
        return context.json({success: false, error: "Banner is not found", statusCode: 404})
    }

    const deletedBanner = await BannerModel.deleteBannerById(id)
    if(deletedBanner){
        return context.json({success: true, message: "Banner is deleted", deletedBanner: deletedBanner, statusCode: 200})
    }else{
        context.status(400)
        return context.json({success: true, message: "Banner couldn't delete", statusCode: 400})
    }

}, "removeBannerController error") 