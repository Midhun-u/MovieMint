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

    getBannerById: async (id: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const banner = await Banner.findByPk(id, {
            ...attributesCondition
        })
        return banner?.dataValues

    },

    getBannerByMovieId: async (movieId: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const banner = await Banner.findOne({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            },
            ...attributesCondition
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