import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { NotificationModel } from "../models/notification.model";
import { notificationQueue } from "../queues/notificationQueue";

// Controller for deleting notification
export const deleteNotificationController = sendErrorResponse(async (context: Context) => {

    const {id} = context.req.param()

    // Checking if notification exists
    const notification = await NotificationModel.getNotificationById(id) as any
    if(!notification){
        context.status(404)
        return context.json({success: false, error: "Notification is not found", statusCode: 404})
    }

    const deletedCount = await NotificationModel.deleteNotificationById(notification.id)
    if(deletedCount){

        // Deleting job
        const job = await notificationQueue.getJob(notification.id)
        if(job){
            await job.remove({removeChildren: true})
        }

        return context.json({success: true, message: "Notification is deleted", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Notification couldn't delete", statusCode: 400})

}, "deleteNotificationController error")