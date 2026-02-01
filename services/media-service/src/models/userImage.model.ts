import { Op } from "sequelize";
import { UserImage } from "../schemas/userImage.schema.js";
import type { AddUserImageType } from "../types/addUserImageType.js";

// User image model
export const UserImageModel = {

    addImage: async (data: AddUserImageType) => {

        const newImage = await UserImage.create({
            userId: data.userId,
            image_url: data.imageUrl,
            image_path: data.imagePath || "",
            image_full_path: data.imageFullPath || "",
            image_type: data.imageType
        })

        return newImage.dataValues

    },

    getImageByUserId: async (userId: string) => {

        const userImage = await UserImage.findOne({
            where: {
                userId: {
                    [Op.eq]: userId
                }
            }
        })

        return userImage?.dataValues

    }

}