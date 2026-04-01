import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TheaterModel } from "../../models/theater.model";
import { getTheaterImage } from "../../services/getTheaterImage";

// Controller for getting batch theaters
export const getBatchTheatersController = sendErrorResponse(async (context: Context) => {

    const {theaterIds} = await context.req.json() as {theaterIds: Array<string>} || {}

    if(!theaterIds?.length){
        context.status(400)
        return context.json({success: false, error: "Theater ids are required", statusCode: 400})
    }

    const theaters = await Promise.all(theaterIds?.map(async theaterId => {

        const theater = await TheaterModel.getTheaterById(theaterId, [
            "id",
            "theater_name",
            "theater_location",
            "allow_cancellation"
        ])

        const image = await getTheaterImage(theaterId)

        return {
            ...theater,
            ...image?.data
        }

    }))

    return context.json({success: true, theaters: theaters, statusCode: 200})

}, "getBatchTheatersController error")