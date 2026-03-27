import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { convertStringToNumber } from "../../utils/convertStringToNumber";
import { ShowModel } from "../../models/show.model";
import { getTheaterImage } from "../../services/getTheaterImage";
import { TheaterModel } from "../../models/theater.model";

// Controller for getting all theaters shows
export const getAllTheatersShowsController = sendErrorResponse(async (context: Context) => {

    const { movieId, day } = context.req.param()
    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)
    const dayNumber = convertStringToNumber(day)

    const shows = await ShowModel.getAllTheatersShowsByMovieId(
        movieId,
        dayNumber,
        new Date().getMonth(),
        new Date().getFullYear(),
        pageNumber,
        limitNumber
    )

    // Fetching theater image
    const showsDetails = await Promise.all(shows.map(async (show: any) => {

        const [imageResult, theater] = await Promise.all([
            await getTheaterImage(show._id),
            await TheaterModel.getTheaterById(show._id, [
                "theater_name",
                "theater_location",
                "allow_cancellation"
            ])
        ])
        return {
            ...show,
            ...theater,
            theater_image: imageResult?.data || { id: "", image_url: "" }
        }

    }) || [])

    return context.json({ success: true, shows: showsDetails.length ? showsDetails : shows, statusCode: 200 })

}, "getAllTheatersShowsController")