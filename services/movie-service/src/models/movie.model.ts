import { Movie } from "../schemas/movie.schema"
import { MovieType } from "../types/movieType"

// Movie model
export const MovieModel = {

    addMovie: async (data: MovieType) => {

        const newMovie = await Movie.create({
            title: data.title,
            sub_heading: data.subheading,
            synopsis: data.synopsis,
            language: data.language,
            certificate: data.certificate,
            movie_trailer: data.trailer,
            duration: data.duration,
            categories: data.categories,
            formats: data.formats,
            actors: data.actors,
            release_date: data.releaseDate,
            status: "PENDING",
            type: data.type
        })

        return newMovie

    },

    getMovieById: async (id: string) => {

        const movie = await Movie.findById(id).lean()
        return movie

    },

    deleteMovieById: async (id: string) => {

        const deletedMovieDetails = await Movie.findByIdAndDelete(id)
        return deletedMovieDetails

    },

    updateMovieById: async (id: string, data: object) => {

        const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
            new: true,
        })

        return updatedMovie

    },

    getMovies: async (condition: object = {}, page: number, limit: number, projection: object = {}) => {

        const movies = await Movie.find(condition, {...projection})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({release_date: -1}).lean()

        return movies

    },

    getPendingMoviesCount: async () => {

        const pendingMoviesCount = await Movie.countDocuments({ status: "PENDING"})
        return pendingMoviesCount

    }

}