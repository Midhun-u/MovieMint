import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { MovieType } from "../types/movieType";
import { movieValidator } from "../validator/movieValidator";

// Controller adding movie
export const addMovieController = sendErrorResponse(async (context: Context) => {

    const data = await context.req.json() as MovieType || {}
    
    const fields = movieValidator(data)
    console.log(fields)

}, "addMovieController error")