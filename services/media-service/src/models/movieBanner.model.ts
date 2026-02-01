import { Banner } from "../schemas/movieBanner.schema.js";
import type { AddMovieImageType } from "../types/addMovieType.js";

export const MovieBannerModel = {

    addBanner: async (data: AddMovieImageType) => {

        const newPoster = await Banner.create({
            movieId: data.movieId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return newPoster.dataValues

    }

}