import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { MovieModel } from "../../models/movie.model";
import { getMovieImage } from "../../services/getMovieImage";

// Controller for getting recommended movies
export const getRecommendedMoviesController = sendErrorResponse(async (context: Context) => {

    const { movieId } = context.req.param()

    if (!movieId) {
        context.status(400)
        return context.json({ success: false, errorMessage: "Movie id is required", statusCode: 400 })
    }

    // Checking if movie exists
    const movie = await MovieModel.getMovieById(movieId)
    if (!movie) {
        context.status(404)
        return context.json({ success: false, errorMessage: "Movie is not found", statusCode: 404 })
    }

    const movies = await MovieModel.getMovies({
        _id: { $ne: movie._id },
        language: movie.language,
        categories: { $in: movie.categories }
    }, 1, 20, {
        title: 1,
        certificate: 1,
        categories: 1,
        language: 1,
        status: 1,
        formats: 1
    })

    const moviesDetails = await Promise.all(movies.map(async (movie) => {

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

    return context.json({ success: true, movies: moviesDetails.length? moviesDetails: movies, statusCode: 200 })

}, "getRecommendedMovies error")