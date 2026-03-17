import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { MovieModel } from "../../models/movie.model";
import { getMovieImage } from "../../services/getMovieImage";
import { getRatings } from "../../services/getRatings";

// Controller for getting specific movie
export const getMovieController = sendErrorResponse(async (context: Context) => {

    const { movieId } = context.req.param()

    if (!movieId) {
        context.status(400)
        return context.json({ success: false, error: "Movie id is required", statusCode: 400 })
    }

    const movie = await MovieModel.getMovieById(movieId)
    if (!movie) {
        context.status(404)
        return context.json({ success: false, error: "Movie is not found", statusCode: 404 })
    }

    // Fetching movie images and ratings
    const [posterResult, bannerResult, rateResult] = await Promise.all([
        getMovieImage("poster", movieId),
        getMovieImage("banner", movieId),
        getRatings(movie._id.toString())
    ])

    const movieDetails = {
        ...movie,
        poster: {...posterResult?.data},
        banner: {...bannerResult?.data},
        ratingsDetails: {
            ...rateResult?.ratingsDetails
        }
    }

    return context.json({ success: true, movie: movieDetails, statusCode: 200 })

}, "getMovieController error")