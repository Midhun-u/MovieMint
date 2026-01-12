import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { validateBody } from "../utils/validateBody.js";
import { UserModel } from "../models/user.model.js";

// Google login controller
export const googleLoginController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {email} = request.body as {email: string} || {}

    const validateResult = validateBody("GOOGLE_LOGIN", request.body as {email: string})
    
    if(!validateResult.success){

        reply.status(400)
        return {success: false, error: validateResult.errorMessage, statusCode: 400}

    }

    // Checking if user signed
    const user = await UserModel.getUserByEmailWithAuthType(email, "GOOGLE")

    if(!user){

        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}

    }

}, "googleLoginController error")