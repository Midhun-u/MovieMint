import { Op } from "sequelize";
import { Actor } from "../schemas/actorImage.schema.js";
import type { AddActorImageType } from "../types/addActorImageType.js";

// Actor image model
export const ActorImageModel = {

    addActorImage: async (data: AddActorImageType) => {

        const actorImage = await Actor.create({
            movie_id: data.movieId,
            actor_id: data.actorId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return actorImage.dataValues

    },

    getActorImageById: async (id: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}
        
        const image = await Actor.findByPk(id, {
            ...attributesCondition
        })
        return image?.dataValues

    },

    getActorImageByActorId: async (actorId: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const image = await Actor.findOne({
            where: {
                actor_id: {
                    [Op.eq]: actorId
                }
            },
            ...attributesCondition
        })

        return image?.dataValues

    },

    getActorImagesByMovieId: async (movieId: string, attributes?: Array<string>) => {

        const attributesCondition = attributes?.length ? { attributes: attributes } : {}

        const actorImages = await Actor.findAll({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            },
            ...attributesCondition,
            limit: 5,
            raw: true
        })

        return actorImages

    },

    deleteActorImagesByMovieId: async (movieId: string) => {

        const deletedCount = await Actor.destroy({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            }
        })

        return deletedCount

    }
}