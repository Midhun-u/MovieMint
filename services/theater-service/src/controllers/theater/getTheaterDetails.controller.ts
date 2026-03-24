import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TheaterModel } from "../../models/theater.model";
import { getTheaterImage } from "../../services/getTheaterImage";
import { getUser } from "../../services/getUser";

// Controller for getting theater details
export const getTheaterDetailsController = sendErrorResponse(async (context: Context) => {

    const { theaterId } = context.req.param()

    if (!theaterId) {
        context.status(400)
        return context.json({ success: false, error: "Theater id is required", statusCode: 400 })
    }

    const theater = await TheaterModel.getTheaterById(theaterId)

    if (!theater) {
        context.status(404)
        return context.json({ success: false, error: "Theater is not found", statusCode: 404 })
    }

    // Fetching theater image and owner profile
    const [imageResult, authResult] = await Promise.all([
        await getTheaterImage(theater.id),
        await getUser(theater.owner_id)
    ])

    if (imageResult.success && authResult.success) {
        theater.theater_image = imageResult.data
        theater.theater_owner = authResult.user
    }

    return context.json({ success: true, theater: theater, statusCode: 200 })

}, "getTheaterDetailsController error")