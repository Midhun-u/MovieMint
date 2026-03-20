import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { NotificationModel } from "../models/notification.model";

// Controller for getting notifications
export const getNotificationsController = sendErrorResponse(async (context: Context) => {

    const {page = 1, limit = 10} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)
    const user = context.get("user")
    
    const notifications = await NotificationModel.getNotificationsByUserId(user.id, pageNumber, limitNumber)
    return context.json({success: true, notifications: notifications, statusCode: 200})

}, "getNotificationsController error")