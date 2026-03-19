import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { MovieModel } from "../../models/movie.model";
import { getMovieImage } from "../../services/getMovieImage";

// Controller getting movie details for batch request
export const getMovieDetailsBatch = sendErrorResponse(async (context: Context) => {

    const { movieIds } = await context.req.json() as { movieIds: Array<string> } || {}

    if (!movieIds?.length || !Array.isArray(movieIds)) {
        context.status(400)
        return context.json({ success: true, error: "Movie ids are required", statusCode: 400 })
    }

    const movies = await Promise.all(movieIds.map(async (movieId) => {
        const movie = await MovieModel.getMovieById(movieId, {
            title: 1,
            certificate: 1,
            categories: 1,
            language: 1,
            status: 1,
            formats: 1
        })
        return movie
    }) || [])

    const moviesDetails = await Promise.all(movies.map(async (movie) => {

        if(!movie) return

        const posterResult = await getMovieImage("poster", movie._id.toString())
        if (posterResult.success) {

            return {
                ...movie,
                poster: {
                    id: posterResult.data.id,
                    image_url: posterResult.data.image_url
                }
            }

        }

    }) || [])

    return context.json({ success: true, movies: moviesDetails.length ? moviesDetails : movies, statusCode: 200 })

}, "getMovieDetailsBatch error")