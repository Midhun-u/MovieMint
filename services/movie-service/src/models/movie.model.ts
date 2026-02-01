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
            actors: data.actors,
            releaseDate: data.releaseDate,
            status: "PENDING"
        })

        return newMovie

    }

}