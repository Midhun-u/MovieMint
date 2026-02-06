import { Context } from "hono";

// Function for handling error which is not handled
export const errorHandler = async (error: Error, context: Context) => {

    console.log(error)

    context.status(500)
    return context.json({success: false, error: "Server error", statusCode: 500})

}