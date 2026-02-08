import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { TheaterModel } from "../models/theater.model";
import { getTheaterImage } from "../services/getTheaterImage";
import { getAuthProfile } from "../services/getAuthProfile";

// Controller for getting theater registration
export const getTheaterRegistrationController = sendErrorResponse(async (context: Context) => {

    const theaterOwner = context.get("auth")
    const authToken = context.req.header("Authorization") || ""

    const theater = await TheaterModel.getTheaterByOwnerId(theaterOwner.id)
    if (!theater) {
        context.status(404)
        return context.json({ success: false, error: "Theater is not found", statusCode: 404 })
    }

    // Fetching theater image and owner profile
    const [imageResult, authResult] = await Promise.all([
        await getTheaterImage(theater.id),
        await getAuthProfile(authToken)
    ])

    if (imageResult.success && authResult.success) {
        theater.theater_image = imageResult.data
        theater.theater_owner = authResult.user
    }

    return context.json({ success: true, theater: theater, statusCode: 200 })

}, "getTheaterRegistrationController error")