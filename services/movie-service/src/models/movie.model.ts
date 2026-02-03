import { Movie } from "../schemas/movie.schema"
import { MovieType } from "../types/movieType"

// Movie model
export const MovieModel = {

    addMovie: async (data: MovieType) => {

        const newMovie = await Movie.create({
            title: data.title,
            subHeading: data.subheading,
            synopsis: data.synopsis,
            language: data.language,
            certificate: data.certificate,
            movieTrailer: data.trailer,
            duration: data.duration,
            categories: data.categories,
            formats: data.formats,
            actors: data.actors,
            releaseDate: data.releaseDate,
            status: "PENDING",
            type: data.type
        })

        return newMovie

    },

    getMovieById: async (id: string) => {

        const movie = await Movie.findById(id)
        return movie

    },

    deleteMovieById : async (id: string) => {

        const deletedMovieDetails = await Movie.findByIdAndDelete(id)
        return deletedMovieDetails

    },

    updateMovieById: async (id: string, data: object) => {

        const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
            new: true,
        })

        return updatedMovie

    }

}