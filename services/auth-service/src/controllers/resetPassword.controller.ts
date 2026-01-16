import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";

// Controller for resetting password
export const resetPasswordController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {userId, newPassword} = request.body as {newPassword: string, userId: string} || {}

    if(!userId || !newPassword){

        reply.status(400)
        return {success: false, error: "Invalid fields", statusCode: 400}

    }

    // Checking if user exists
    const user = await UserModel.getUserById(userId)

    if(!user){

        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}

    }

    // Hashing password
    const hashedPassword = await hashPassword(newPassword)

    console.log(hashedPassword)
    return {success: true}
    

}, "resetPasswordController error")