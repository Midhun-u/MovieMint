import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { LoginBody } from "../types/body.js";
import { validateBody } from "../utils/validateBody.js";
import { UserModel } from "../models/user.model.js";
import { checkPassword } from "../utils/password.js";
import { envVariables } from "../utils/envVariables.js";
import { generateToken } from "../utils/generateToken.js";

// Login Controller
export const loginController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const { email, password, role, adminKey } = request.body as LoginBody || {}

    const validateResult = await validateBody("LOGIN", request.body as LoginBody)

    if (!validateResult.success) {

        reply.status(400)
        return { success: false, error: validateResult.errorMessage, statusCode: 400 }

    }

    // Check if user signed
    const user = await UserModel.getUserByEmailWithAuthType(email.trim(), "EMAIL")

    if(!user){
        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}
    }

    // Checking password is correct
    const isCorrect = await checkPassword(password, user.password)

    if(!isCorrect){
        reply.status(400)
        return {success: false, error: "Password is incorrect", statusCode: 400}
    }

    if(role === "ADMIN"){

        if(adminKey !== envVariables.ADMIN_KEY){

            reply.status(400)
            return {success: false, error: "Admin key is invalid", statusCode: 400}

        }

    }

    // Generating auth token
    const authToken = await generateToken(reply, {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: user.role
    })

    // Exclude user password
    const {password: userPassword, ...userDetails} = user

    return {success: true, message: "Login success", authToken: authToken, user: userDetails, statusCode: 200}

}, "loginController error")