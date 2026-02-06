import { Context } from "hono";

// Function for sending not found error when route is not found
export const notFound = (context: Context) => {

    context.status(404)
    return context.json({success: false, error: "Route is not found", statusCode: 404})

}