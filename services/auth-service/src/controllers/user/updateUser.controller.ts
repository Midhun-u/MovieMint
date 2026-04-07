import type { FastifyReply, FastifyRequest } from "fastify";
import type { JWT_PAYLOAD } from "../../types/jwt.js";
import { UserModel } from "../../models/user.model.js";

// Controller for updating user
export const updateUserController = async (request: FastifyRequest, reply: FastifyReply) => {

    const {id: userId} = request.user as JWT_PAYLOAD
    const body = request.body as any

    const user = await UserModel.getUserById(userId)
    if(!user){
        reply.status(404)
        return {
            success: false,
            error: "User is not found",
            statusCode: 404
        }
    }

    if(body.id || body.email || body.role || body.password || body.auth_type || body.createdAt) {
        reply.status(403)
        return {
            success: false,
            error: "These fields are not editable",
            statusCode: 403
        }
    }
    console.log(body)

    const updatedCount = await UserModel.updateUserById(user.id, body)
    if(updatedCount){

        return {
            success: true,
            message: "User is updated",
            statusCode: 200
        }

    }

    reply.status(400)
    return {
        success: false,
        error: "Couldn't update user",
        statusCode: 400
    }

}