import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { ShowModel } from "../models/show.model";

// Controller for updating show
export const updateShowController = sendErrorResponse(async (context: Context) => {

    const { showId } = context.req.param()
    const body = await context.req.json()

    if (!showId) {
        context.status(400)
        return context.json({ success: false, error: "Show id is required", statusCode: 400 })
    }

    // Checking if show exists
    const show = await ShowModel.getShowById(showId)
    if (!show) {
        context.status(404)
        return context.json({ success: false, error: "Show is not found", statusCode: 404 })
    }

    if (body._id || body.movie_id || body.createdAt){
        context.status(400)
        return context.json({success: false, error: "These fields are not editable", statusCode: 400})
    }

    const updatedShow = await ShowModel.updateShowById(showId, body)
    if(updatedShow){
        return context.json({success: true, message: "Show is updated", show: updatedShow, statusCode: 200})
    }

    return context.json({success: false, error: "Show is not updated", statusCode: 400})

}, "updateShowController error")