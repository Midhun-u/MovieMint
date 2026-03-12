import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { MovieModel } from "../models/movie.model";
import { getMovieImage } from "../services/getMovieImage";

// Controller for getting movies
export const getMoviesController = sendErrorResponse(async (context: Context) => {

    const {
        page = 1,
        limit = 10,
        title = "",
        language = "",
        status = "",
        movieType = ""
    } = context.req.query()

    const {
        formats = [],
        categories = []
    } = context.req.queries()
 
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    // Adding formats to the condition
    const formatsConditon = Array.isArray(formats) && formats.length ? {
        formats: { $in: formats }
    } : {}

    // Adding language to the condition
    const languageCondtion = language ? { language: language } : {}

    // Adding categories to the condition
    const categoriesCondtion = Array.isArray(categories) && categories.length ? {
        categories: { $in: categories }
    } : {}

    // Adding status to the condition
    const statusCondition = status? {status: status}: {}

    // Adding movie type to the condition
    const movieTypeCondition = movieType? {type: movieType}: {}

    const movies = await MovieModel.getMovies({
        title: { $regex: `${title}`, $options: "i" },
        ...languageCondtion,
        ...formatsConditon,
        ...categoriesCondtion,
        ...statusCondition,
        ...movieTypeCondition
    }, pageNumber, limitNumber, {
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

    return context.json({ success: true, movies: moviesDetails.length ? moviesDetails : movies, statusCode: 200 })

}, "getMoviesController error")