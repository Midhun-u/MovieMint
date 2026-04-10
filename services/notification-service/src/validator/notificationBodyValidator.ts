import { NotificationBody } from "../types/notificationBody";
import * as zod from 'zod'

// Function for validating notification body
export const validateNotificationBody = (data: NotificationBody): {success: boolean, fields?: Omit<NotificationBody, "metadata" | "availableDate">, errorMessage?: string} => {

    try {

        const validator = zod.object({
            userId: zod.string().nonempty(),
            success: zod.boolean().nonoptional(),
            type: zod.enum(["movie", "payment", "theater"]).nonoptional(),
            title: zod.string().min(3).max(255),
            message: zod.string().min(5).max(500),
        })

        const fields = validator.parse(data)

        return {success: true, fields: fields}

    } catch (error: any) {
        console.log(error)
        const zodError = JSON.parse(error)
        return { success: false, errorMessage: zodError[0].message }
    }

}