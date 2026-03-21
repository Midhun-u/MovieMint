import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { NotificationModel } from "../models/notification.model";

// Controller for getting specific notification
export const getMovieNotificationController = sendErrorResponse(async (context: Context) => {

    const user = context.get("user")
    const {movieId} = context.req.param()
    
    if(!movieId){
        context.status(400)
        return context.json({success: false, error: "Movie id is required", statusCode: 400})
    }

    const notification = await NotificationModel.getNotificationByMovieIdAndUserId(movieId, user.id)
   
    return context.json({success: true, notification: notification, statusCode: 200})

}, "getNotificationController error")