import { handleError } from "../utils/handleError";
import { notificationInstance } from "./axiosInstance";

// Api for adding notification
export const addNotificationApi = handleError(async ({ 
    userId,
    success,
    type,
    title,
    message,
    metadata,
}: {
    userId: string
    success: boolean
    type: string
    title: string
    message: string
    metadata: object
}) => {

    const result = await notificationInstance.post("/add-notification", {
        userId: userId,
        success: success,
        type: type,
        title: title,
        message: message,
        metadata: metadata
    })

    return result.data

})