import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { NotificationBody } from "../types/notificationBody";
import { validateNotificationBody } from "../validator/notificationBodyValidator";
import { NotificationModel } from "../models/notification.model";
import { notificationQueue } from "../queues/notificationQueue";

// Controller for adding notification
export const addNotificationController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json() as NotificationBody

    console.log(body)
    // Validating request body
    const validator = validateNotificationBody(body)
    if (!validator.success || !validator.fields || !body.metadata) {
        context.status(400)
        return context.json({ success: false, error: "Invalid fields", statusCode: 400 })
    }

    const newNotification = await NotificationModel.addNotification({
        ...validator.fields,
        metadata: body.metadata,
        status: body.availableDate? "PENDING": "AVAILABLE"
    })

    if (newNotification) {

        if (body.availableDate) {

            const targetTime = new Date(body.availableDate)
            const delayedTime = targetTime.getTime() - Date.now()

            // Scheduling delayed job
            await notificationQueue.add(
                `notification-${newNotification.id}`,
                {
                    notification: newNotification,
                    update: true
                },
                {
                    delay: delayedTime,
                    jobId: newNotification.id
                }
            )

        }else{
            // Scheduling job
            await notificationQueue.add(
                `notification-${newNotification.id}`,
                {
                    notification: newNotification,
                    update: false
                },
                {
                    jobId: newNotification.id
                }
            )
        }

        context.status(201)
        return context.json({ success: true, message: "Notification is created", notification: newNotification, statusCode: 201 })
    }

    context.status(400)
    return context.json({ success: false, error: "Couldn't add notification", statusCode: 400 })

}, "addNotificationController error")