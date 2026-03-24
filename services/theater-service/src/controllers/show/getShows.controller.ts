import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { ShowModel } from "../../models/show.model";
import { convertStringToNumber } from "../../utils/convertStringToNumber";
import { getMovie } from "../../services/getMovie";

// Controller for getting shows
export const getShowsController = sendErrorResponse(async (context: Context) => {

    const {theaterId} = context.req.param()
    const {page = 1, limit = 10, status = ""} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    if(!theaterId){
        context.status(400)
        return context.json({success: false, error: "Theater id is required", statusCode: 400})
    }
    
    const shows = await ShowModel.getShowsByTheaterId(theaterId, pageNumber, limitNumber, status)

    // Fetching movie details
    const showsDetails = await Promise.all(shows.map(async (show) => {
        const result = await getMovie(show.movie_id)
        if(result.success){
            return {
                ...show,
                movie: {
                    title: result?.movie?.title,
                    language: result?.movie?.language,
                    certificate: result?.movie?.certificate,
                    categories: result?.movie?.categories,
                    formats: result?.movie?.formats,
                    poster: result?.movie?.poster
                }
            }
        }

    }) || [])
    
    return context.json({success: true, shows: showsDetails.length? showsDetails: shows, statusCode: 200})


}, "getShowsController error")