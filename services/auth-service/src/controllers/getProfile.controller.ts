import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { JWT_PAYLOAD } from "../types/jwt.js";
import { UserModel } from "../models/user.model.js";
import { excludePassword } from "../utils/excludePassword.js";
import { getUserProfileImage } from "../service/getImage.js";

// Controller for getting profile
export const getProfileController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const jwtPayload = request.user as JWT_PAYLOAD

    if(!jwtPayload.id){
        reply.status(400)
        return {success: false, error: "User id is missing", statusCode: 400}
    }

    const user = await UserModel.getUserById(jwtPayload.id)

    if(!user){
        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}
    }

    // Excluding password
    const userWithoutPassword = excludePassword(user)

    // Getting user profile image
    const imageResult = await getUserProfileImage(jwtPayload.id)

    let userData = {...userWithoutPassword}

    if(imageResult.success && imageResult.data?.userImage){

        userData.profileImage = {
            imageId: imageResult.data?.userImage.id,
            imageType: imageResult.data?.userImage.image_type,
            imageUrl: imageResult.data?.userImage.image_url
        }

    }else{
        userData.profileImage = {}
    }

    return {success: true, user: userData, statusCode: 200}

}, "getProfileController error")