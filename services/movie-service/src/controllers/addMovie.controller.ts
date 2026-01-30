import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";

// Controller adding movie
export const addMovieController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json()
    console.log(body)

    return context.json({success: true})

}, "addMovieController error")