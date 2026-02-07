import { Op } from "sequelize";
import { TheaterImage } from "../schemas/theaterImage.schema.js";
import type { AddTheaterImageType } from "../types/addTheaterImageType.js";

// Theater image model
export const TheaterImageModel = {

    addImage: async (data: AddTheaterImageType) => {

        const newImage = await TheaterImage.create({
            theater_id: data.theaterId,
            image_url: data.imageUrl,
            image_path: data.imagePath,
            image_full_path: data.imageFullPath,
            image_type: data.imageType
        })

        return newImage.dataValues

    },

    getImageByTheaterId: async (theaterId: string) => {

        const image = await TheaterImage.findOne({
           where: {
                theater_id: {
                    [Op.eq]: theaterId
                }
           } 
        })

        return image

    }

}