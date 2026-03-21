'use server'

import { envVariables } from "@/utils/envVariables"
import { handleError } from "@/utils/handleError"
import * as zod from 'zod'
import { fetchInstance } from "./fetch"

const NOTIFICATION_BASE_URL = envVariables.NOTIFICATION_URL

type AddNotificationType = {
    userId: string
    success: boolean
    type: "movie" | "payment"
    title: string
    message: string
    metadata: object
    availableDate?: string
}

// Api for adding notification
export const addNotificationApi = handleError(async (data: AddNotificationType) => {

    if (!data.metadata) return
    
    const validator = zod.object({
        userId: zod.string().nonempty(),
        success: zod.boolean().nonoptional(),
        type: zod.enum(["movie", "payment"]).nonoptional(),
        title: zod.string().min(3).max(255),
        message: zod.string().min(5).max(255),
        availableDate: zod.string().optional()
    })

    const fields = validator.parse(data)

    const result = await fetchInstance(NOTIFICATION_BASE_URL, "/add-notification", "POST", {
        userId: fields.userId,
        success: fields.success,
        type: fields.type,
        title: fields.title,
        message: fields.message,
        metadata: data.metadata,
        availableDate: fields.availableDate || ""
    }, "json")

    return result

})

// Api for getting movie notification
export const getMovieNotificationApi = handleError(async (movieId: string, authToken: string) => {

    const result = await fetchInstance(NOTIFICATION_BASE_URL, `/get-movie-notification/${movieId}`, "GET", {}, "json", authToken)
    return result

})

// Api for deleting notification
export const deleteNotificationApi = handleError(async (id: string, authToken) => {

    const result = fetchInstance(NOTIFICATION_BASE_URL, `/delete-notification/${id}`, "DELETE", {}, "json", authToken)
    return result

})

// Api for getting all notifications
export const getAllNotificationsApi = handleError(async (page: number = 1, limit: number = 10, authToken: string) => {

    const result = await fetchInstance(NOTIFICATION_BASE_URL, `/get-notifications/?page=${page}&limit=${limit}`, "GET", {}, "json", authToken)
    return result

})