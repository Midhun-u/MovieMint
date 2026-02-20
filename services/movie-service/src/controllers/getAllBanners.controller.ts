import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { BannerModel } from "../models/banner.model";

// Controller for getting all banners
export const getAllBannersController = sendErrorResponse(async (context: Context) => {

    const banners = await BannerModel.getBanners(10, {
        title: 1,
        certificate: 1,
        categories: 1,
        language: 1,
        status: 1,
        formats: 1
    })
    
    const bannerDetaiils = banners.map((banner) => {
        return {
            _id: banner._id,
            movie: banner.movie_id,
            createdAt: banner.createdAt
        }
    })

    return context.json({ success: true, banners: bannerDetaiils, statusCode: 200 })

}, "getAllBannersController error")