import { Op } from "sequelize";
import { Poster } from "../schemas/moviePoster.schema.js";
import type { AddMovieImageType } from "../types/addMovieType.js";

// Movie poster model
export const MoviePosterModel = {

    addPoster: async (data: AddMovieImageType) => {

        const newPoster = await Poster.create({
            movie_id: data.movieId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return newPoster.dataValues

    },

    getPosterById: async (id: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const poster = await Poster.findByPk(id, {
            ...attributesCondition
        })
        return poster?.dataValues

    },

    deletePosterById: async (id: string) => {

        const deletedCount = await Poster.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return deletedCount

    },

    getPosterByMovieId: async (movieId: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const poster = await Poster.findOne({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            },
            ...attributesCondition
        })

        return poster?.dataValues

    }

}