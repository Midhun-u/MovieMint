import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { MovieModel } from "../models/movie.model";
import { getMovieImage } from "../services/getMovieImage";

// Controller for getting movies
export const getMoviesController = sendErrorResponse(async (context: Context) => {

    const {page = 1, limit = 10} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const movies = await MovieModel.getMovies({},pageNumber, limitNumber, {
        title: 1, 
        certificate: 1, 
        categories: 1, 
        language: 1,
        status: 1
    })

    const moviesDetails = await Promise.all(movies.map(async (movie) => {

        const posterResult = await getMovieImage("poster", movie._id.toString())
        if(posterResult.success){

            return {
                ...movie,
                poster: {
                    id: posterResult.data.id,
                    image_url: posterResult.data.image_url
                }
            }

        }

    }) || [])
   
    return context.json({success: true, movies: moviesDetails.length? moviesDetails: movies, statusCode: 200})

}, "getMoviesController error")