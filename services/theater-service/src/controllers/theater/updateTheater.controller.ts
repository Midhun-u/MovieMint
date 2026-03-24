import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TheaterModel } from "../../models/theater.model";

// Controller for updating theater
export const updateTheaterController = sendErrorResponse(async (context: Context) => {

    const { theaterId } = context.req.param()
    const body = await context.req.json()

    if (!theaterId) {
        context.status(400)
        return context.json({ success: false, error: "Theater id is required", statusCode: 400 })
    }

    const theater = await TheaterModel.getTheaterById(theaterId)
    if (!theater) {
        context.status(404)
        return context.json({ success: false, error: "Theater is not found", statusCode: 404 })
    }

    if (
        body.layout_number ||
        body.rows_number ||
        body.sets_number ||
        body.seats_number ||
        body.id ||
        body.owner_id
    ) {
        context.status(400)
        return context.json({success: false, error: "These fields are not editable", statusCode: 400})
    }

    const updatedCount = await TheaterModel.updateTheaterById(theaterId, body)
    if(updatedCount){
        return context.json({success: true, message: "Theater is updated", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Theater couldn't update", statusCode: 400})

}, "updateTheaterController error")