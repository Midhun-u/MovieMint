import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { convertStringToNumber } from "../../utils/convertStringToNumber";
import { ShowModel } from "../../models/show.model";

// Controller for getting all theaters shows
export const getAllTheatersShowsController = sendErrorResponse(async (context: Context) => {
    
    const {movieId} = context.req.param()
    const {page = 1, limit = 10} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    // Fetching theaters
    

    const shows = await ShowModel.getAllTheatersShowsByMovieId(movieId, pageNumber, limitNumber)

    return context.json({success: true, shows: shows, statusCode: 200})

}, "getAllTheatersShowsController")