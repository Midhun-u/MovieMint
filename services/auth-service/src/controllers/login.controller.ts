import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { LoginBody } from "../types/body.js";
import { validateBody } from "../validator/validateBody.js";
import { UserModel } from "../models/user.model.js";
import { checkPassword } from "../utils/password.js";
import { envVariables } from "../utils/envVariables.js";
import { generateToken } from "../utils/generateToken.js";
import { excludePassword } from "../utils/excludePassword.js";

// Login Controller
export const loginController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const { email, password, role, adminKey } = request.body as LoginBody || {}

    const validateResult = await validateBody("LOGIN", request.body as LoginBody)

    if (!validateResult.success) {

        reply.status(400)
        return { success: false, error: validateResult.errorMessage, statusCode: 400 }

    }

    // Check if user signed
    const user = await UserModel.getUserByEmailWithAuthTypeAndRole(email.trim(), "EMAIL", role)

    if(!user){

        // Sending response according to role
        reply.status(404)
        let responseObj = {success: false, error: "", statusCode: 404}

        if(role === "USER"){  
            responseObj.error = "User is not found"
        }else if(role === "ADMIN"){
            responseObj.error = "Admin is not found"
        }else{
            responseObj.error = "Theater owner is not found"
        }

        return responseObj
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

    // Excluding user password
    const userDetails = excludePassword(user)

    return {success: true, message: "Login success", authToken: authToken, user: userDetails, statusCode: 200}

}, "loginController error")