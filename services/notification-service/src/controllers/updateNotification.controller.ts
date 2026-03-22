import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { NotificationModel } from "../models/notification.model";

// Controller for updating notification
export const updateNotificationController = sendErrorResponse(async (context: Context) => {

    const {id} = context.req.param()
    const body = await context.req.json()

    if(!id || !body){
        context.status(400)
        return context.json({success: false, error: "All fields are required", statusCode: 400})
    }

    // Checking if notification exists
    const notification = await NotificationModel.getNotificationById(id)
    if(!notification){
        context.status(404)
        return context.json({success: false, error: "Notification is not found", statusCode: 404})
    }
    
    if(body.id || body.user_id || body.createdAt || body.updatedAt){
        context.status(403)
        return context.json({success: false, error: "These fields are not editable", statusCode: 403})
    }

    const {updatedCount} = await NotificationModel.updateNotificationById(id, body)
    if(updatedCount){
        return context.json({success: true, message: "Notification is updated", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Couldn't update notification", statusCode: 400})

}, "updateNotificationController error")