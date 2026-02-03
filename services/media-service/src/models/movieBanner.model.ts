import { Op } from "sequelize";
import { Banner } from "../schemas/movieBanner.schema.js";
import type { AddMovieImageType } from "../types/addMovieType.js";

// Movie banner model
export const MovieBannerModel = {

    addBanner: async (data: AddMovieImageType) => {

        const newPoster = await Banner.create({
            movie_id: data.movieId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return newPoster.dataValues

    },

    getBannerById: async (id: string) => {

        const banner = await Banner.findByPk(id)
        return banner?.dataValues

    },

    getBannerByMovieId: async (movieId: string) => {

        const banner = await Banner.findOne({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            }
        })

        return banner?.dataValues

    },

    deleteBannerById: async (id: string) => {

        const deletedCount = Banner.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return deletedCount

    }

}