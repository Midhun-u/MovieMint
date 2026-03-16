import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { MovieModel } from "../../models/movie.model";
import { BannerModel } from "../../models/banner.model";

// Controller for adding banner
export const addBannerController = sendErrorResponse(async (context: Context) => {

    const {movieId} = await context.req.json() || {}

    if(!movieId){
        context.status(400)
        return context.json({success: false, error: "All fields are required", statusCode: 400})
    }

    const movie = await MovieModel.getMovieById(movieId)
    if(!movie){

        context.status(404)
        return context.json({success: false, error: "Movie is not found", statusCode: 404})

    }

    // Checking if total banners limit exceeded
    const totalBannersCount = await BannerModel.getBannersCount()
    if(totalBannersCount >= 10){
        context.status(401)
        return context.json({success: false, error: "The limit is exceeded", statusCode: 401})
    }

    // Checking if movie is already added to banner
    const banner = await BannerModel.getBannerByMovieId(movieId)
    if(banner){
        context.status(409)
        return context.json({success: true, message: "Banner is already exist", statusCode: 409})
    }

    // Adding movie to banner
    const newBanner = await BannerModel.addBanner({
        movieId: movieId
    })

    if(newBanner){
        context.status(201)
        return context.json({success: true, message: "Movie is added to banner", banner: newBanner, statusCode: 201})
    }

    context.status(400)
    return context.json({success: false, error: "Movie couldn't add to banner", statusCode: 400})

}, "addBannerController error")