import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";

// Controller for deleting movie
export const deleteMovieController = sendErrorResponse(async (context: Context) => {

    const movieId = await context.req.param("movieId")
    

}, "deleteMovieController error")