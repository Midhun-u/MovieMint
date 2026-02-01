import { Poster } from "../schemas/moviePoster.schema.js";
import type { AddMoviePosterType } from "../types/addMoviePosterType.js";

// Movie poster model
export const MoviePosterModel = {

    addPoster: async (data: AddMoviePosterType) => {

        const newPoster = await Poster.create({
            movieId: data.movieId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return newPoster.dataValues

    }

}