import { type Context } from "hono"

// Function for sending error response when error occurred
export const sendErrorResponse = (fn: Function, errorMessage: string) => {

    return async (context: Context) => {

        try {

            return await fn(context)

        } catch (error: any) {

            console.log(`${errorMessage} ${error}`)

            context.status(500)
            return context.json({ success: false, error: "Server error", statusCode: 500 })
        }

    }

}