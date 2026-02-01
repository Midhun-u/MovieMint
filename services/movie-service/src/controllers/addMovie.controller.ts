import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { MovieType } from "../types/movieType";
import { movieValidator } from "../validator/movieValidator";
import { MovieModel } from "../models/movie.model";

// Controller adding movie
export const addMovieController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json() as MovieType || {}
    const result = movieValidator(body)
    
    if(!result.success){
        context.status(400)
        return {success: false, error: "Invalid fields", statusCode: 400}
    }

    const movie = await MovieModel.addMovie(body)
    
    if(movie){
        context.status(201)
        return context.json({success: true, message: "Movie is uploaded", statusCode: 201, movie: movie})
    }

    context.status(400)
    return context.json({success: false, error: "Couldn't upload movie", statusCode: 400})

}, "addMovieController error")