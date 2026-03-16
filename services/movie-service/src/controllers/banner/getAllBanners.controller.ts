import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { BannerModel } from "../../models/banner.model";
import { getMovieImage } from "../../services/getMovieImage";

// Controller for getting all banners
export const getAllBannersController = sendErrorResponse(async (context: Context) => {

    const banners = await BannerModel.getBanners(10, {
        title: 1,
        certificate: 1,
        categories: 1,
        language: 1,
        status: 1,
        formats: 1,
        sub_heading: 1,
        duration: 1
    })

    const bannersDetaiils = await Promise.all(banners.map(async (banner) => {

        // Fetching movie image
        const [posterResult, bannerResult] = await Promise.all([
            getMovieImage("poster", banner.movie_id._id.toString()),
            getMovieImage("banner", banner.movie_id._id.toString())
        ])

        return {
            _id: banner._id,
            movie: {
                ...banner.movie_id,
                poster: posterResult.success? posterResult.data: {},
                banner: bannerResult.success? bannerResult.data: {}
            },
            createdAt: banner.createdAt
        }

    }) || [])

    return context.json({ success: true, banners: bannersDetaiils.length? bannersDetaiils: banners, statusCode: 200 })

}, "getAllBannersController error")