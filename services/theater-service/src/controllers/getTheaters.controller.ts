import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { TheaterModel } from "../models/theater.model";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { getTheaterImage } from "../services/getTheaterImage";
import { getUser } from "../services/getUser";

// Controller for getting theaters
export const getTheatersController = sendErrorResponse(async (context: Context) => {

    const {
        page = 1,
        limit = 10,
        theaterName = "",
        status = ""
    } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    if(status === "PENDING"){
        context.status(400)
        return context.json({success: false, error: "Invalid status", statusCode: 400})
    }
    const theaters = await TheaterModel.getTheaters(pageNumber, limitNumber, status, theaterName)

    // Fetching theater image
    const theaterDetails = await Promise.all(theaters.map(async (theater) => {

        const [imageResult, authResult] = await Promise.all([
            getTheaterImage(theater.dataValues.id),
            getUser(theater.dataValues.owner_id)
        ])

        return {
            ...theater.dataValues,
            theater_image: {
                id: imageResult?.data?.id,
                image_url: imageResult?.data?.image_url
            },
            theater_owner: authResult?.user,
        }

    }) || [])

    return context.json({
        success: true,
        theaters: theaterDetails.length ? theaterDetails : theaters,
        statusCode: 200
    })

}, "getTheatersController error")