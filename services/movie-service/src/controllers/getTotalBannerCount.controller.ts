import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { BannerModel } from "../models/banner.model";

// Controller for getting total count of banners
export const getTotalBannerCountController = sendErrorResponse(async (context: Context) => {

    const totalCount = await BannerModel.getBannersCount()

    return context.json({success: true, totalCount: totalCount, statusCode: 200})

}, "getTotalBannerCountController error")