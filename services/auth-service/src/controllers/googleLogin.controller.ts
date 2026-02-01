import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { validateBody } from "../validator/validateBody.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { excludePassword } from "../utils/excludePassword.js";
import type { Role } from "../types/role.js";

// Google login controller
export const googleLoginController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const { email, role } = request.body as { email: string, role: Role } || {}

    const validateResult = validateBody("GOOGLE_LOGIN", request.body as { email: string, role: Role })

    if (!validateResult.success) {

        reply.status(400)
        return { success: false, error: validateResult.errorMessage, statusCode: 400 }

    }

    // Checking if user signed
    const user = await UserModel.getUserByEmailWithAuthTypeAndRole(email, "GOOGLE", role)

    if (!user) {

        // Sending response according to role
        reply.status(404)
        let responseObj = { success: false, error: "", statusCode: 404 }

        if (role === "USER") {
            responseObj.error = "User is not found"
        } else {
            responseObj.error = "Theater owner is not found"
        }

        return responseObj

    }

    // Generating auth token
    const authToken = await generateToken(reply, {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: user.role
    })

    // Excluding user password
    const userDetails = excludePassword(user)

    return { success: true, message: "Login success", user: userDetails, authToken: authToken, statusCode: 200 }

}, "googleLoginController error")