import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { UserModel } from "../models/user.model.js";
import { getUserProfileImage } from "../service/image/getImage.js";

// Controller for getting a specific user
export const getUserController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {userId} = request.params as {userId: string}

    if(!userId){
        reply.status(400)
        return {success: false, error: "User id is missing", statusCode: 400}
    }

    const user = await UserModel.getUserById(userId, [
        "id", 
        "email", 
        "firstname",
        "lastname",
        "email",
        "role"
    ])

    if(!user){
        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}
    }

    // Fetching user image
    const result = await getUserProfileImage(user.id)
    if(!result.success){
        reply.status(502)
        return {success: false, error: "Couldn't get the user image", statusCode: 502}
    }
    
    const userData = {
        ...user,
        profile_image: {
            id: result.data.userImage.id,
            image_url: result.data.userImage.image_url
        }
    }

    return {success: true, user: userData, statusCode: 200}

}, "getUserController error")