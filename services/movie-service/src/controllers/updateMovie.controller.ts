import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { MovieModel } from "../models/movie.model";

// Controller for updating movie
export const updateMovieController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json()
    const {movieId} = context.req.param()

    if(!movieId){
        context.status(400)
        return context.json({success: false, error: "Movie id is required", statusCode: 400})
    }

    const updatedMovie = await MovieModel.updateMovieById(movieId, body)
    if(!updatedMovie){
        context.status(400)
        return context.json({success: false, error: "Movie is not updated", statusCode: 400})
    }

    return context.json({success: true, message: 'Movie is updated', movie: updatedMovie, statusCode: 200})

}, "updateMovieController error")