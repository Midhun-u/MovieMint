import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { ShowModel } from "../../models/show.model";

// Controller for getting specific show
export const getShowController = sendErrorResponse(async (context: Context) => {

    const {showId} = context.req.param()

    if(!showId){
        context.status(400)
        context.json({success: false, error: "Show id is required", statusCode: 400})
    }

    const show = await ShowModel.getShowById(showId)

    return context.json({success: true, show: show, statusCode: 200})

}, "getShowController error")