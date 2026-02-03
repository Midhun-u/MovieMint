import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { MovieModel } from "../models/movie.model";

// Controller for deleting movie
export const deleteMovieController = sendErrorResponse(async (context: Context) => {

    const movieId = context.req.param("movieId")
    
    if(!movieId){
        context.status(400)
        return context.json({success: false, error: "All fields are required", statusCode: 400})
    }

    // Checking if movie exists
    const movie = await MovieModel.getMovieById(movieId)
    if(!movie) {
        context.status(404)
        return context.json({success: false, error: "Movie is not found", statusCode: 404})
    }

    const deletedMovieDetails = await MovieModel.deleteMovieById(movieId)
    if(!deletedMovieDetails){
        context.status(400)
        return context.json({success: false, error: "Movie couldn't delete", statusCode: 400})
    }

    return context.json({success: true, message: "Movie is deleted", deletedMovie: deletedMovieDetails, statusCode: 200})

}, "deleteMovieController error")