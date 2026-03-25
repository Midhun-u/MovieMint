import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { convertStringToNumber } from "../../utils/convertStringToNumber";
import { ShowModel } from "../../models/show.model";
import { getTheaterImage } from "../../services/getTheaterImage";

// Controller for getting all theaters shows
export const getAllTheatersShowsController = sendErrorResponse(async (context: Context) => {
    
    const {movieId} = context.req.param()
    const {page = 1, limit = 10} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const shows = await ShowModel.getAllTheatersShowsByMovieId(movieId, pageNumber, limitNumber)

    // Fetching theater image
    const showsDetails = await Promise.all(shows.map(async (show: any) => {

        const imageResult = await getTheaterImage(show._id)
        return {
            ...show,
            theater_image: imageResult?.data || {id: "", image_url: ""}
        }

    }) || [])

    return context.json({success: true, shows: showsDetails.length? showsDetails: shows, statusCode: 200})

}, "getAllTheatersShowsController")