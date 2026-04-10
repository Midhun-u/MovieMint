import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { UserModel } from "../../models/user.model.js";
import type { JWT_PAYLOAD } from "../../types/jwt.js";
import { checkPassword, hashPassword } from "../../utils/password.js";

// Controller for changing user password
export const changeUserPasswordController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const authUser = request.user as JWT_PAYLOAD
    const user = await UserModel.getUserByIdWithAuthType(authUser.id, "EMAIL")
    const {currentPassword, newPassword} = request.body as {currentPassword: string, newPassword: string} || {}

    if(!user){
        reply.status(403)
        return {success: false, error: "Password can only change with email authentication", statusCode: 400}
    }

    if(!currentPassword || !newPassword){
        reply.status(400)
        return {success: false, error: "All fields are required", statusCode: 400}
    }

    const isCorrect = await checkPassword(currentPassword, user.password)
    if(!isCorrect){
        reply.status(400)
        return {success: false, error: "Password is incorrect", statusCode: 400}
    }

    if(newPassword.length < 6){
        reply.status(400)
        return {
            success: false,
            error: "Password must be atleast 6 letters or above",
            statusCode: 400
        }
    }

    const hashedPassword = await hashPassword(newPassword)
    const updatedUser = await UserModel.updateUserById(user.id, {
        password: hashedPassword
    })
    
    if(updatedUser){
        reply.status(200)
        return {
            success: true,
            message: "Password is updated",
            statusCode: 200
        }
    }else{

        reply.status(200)
        return {
            success: false,
            error: "Password is couldn't update"
        }

    }

}, "changeUserPasswordController error")