import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { NotificationModel } from "../models/notification.model";

// Controller for deleting notification
export const deleteNotificationController = sendErrorResponse(async (context: Context) => {

    const {id} = context.req.param()

    // Checking if notification exists
    const notification = await NotificationModel.getNotificationById(id)
    if(!notification){
        context.status(404)
        return context.json({success: false, error: "Notification is not found", statusCode: 404})
    }

    const deletedCount = await NotificationModel.deleteNotificationById(id)
    if(deletedCount){
        return context.json({success: true, message: "Notification is deleted", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Notification couldn't delete", statusCode: 400})

}, "deleteNotificationController error")