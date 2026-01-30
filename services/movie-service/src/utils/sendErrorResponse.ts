import { Context } from "hono"

// Function for sending error response when error occurred
export const sendErrorResponse = (fn: Function, errorMessage: string) => {

    return (context: Context) => {

        try {
            
            return fn(context)

        } catch (error: any) {

            console.log(`${errorMessage} ${error}`)

            context.status(500)
            return context.json({success: false, error: "Server error", statusCode: 500})
        }

    }

}