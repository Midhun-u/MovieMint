import {type FastifyReply, type FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { SignBody } from "../types/body.js";
import { validateBody } from "../utils/validateBody.js";
import { envVariables } from "../utils/envVariables.js";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/generateToken.js";
import { excludePassword } from "../utils/excludePassword.js";

// Controller for signing
export const signController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {firstname, lastname, email, password, role, adminKey} = await request.body as SignBody

    // Validating body
    const result = validateBody("SIGN", request.body as SignBody)

    if(!result.success){

        reply.status(400)
        return {success: false, error: result.errorMessage, statusCode: 400}

    }
    
    // Checking if admin registration
    if(role === "ADMIN"){

        if(adminKey !== envVariables.ADMIN_KEY){

            reply.status(400)
            return {success: false, error: "Admin key is invalid", statusCode: 400}

        }

    }

    // Check if email already exists
    const user = await UserModel.getUserByEmail(email)
    
    if(user){

        reply.status(409)
        return {success: false, error: "Email already exists", statusCode: 409}

    }

    // Hashing password
    const hashedPassword = await hashPassword(password.trim())
    
    const newUser = await UserModel.addUser({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: hashedPassword,
        auth_type: "EMAIL",
        role: role
    })

    if(newUser){

        // Generating token 
        const authToken = await generateToken(reply, {
            id: newUser.id,
            name: `${newUser.firstname} ${newUser.lastname}`,
            email: newUser.email,
            role: newUser.role
        })

        // Excluding user password
        const newUserDetails = excludePassword(newUser)

        reply.status(201)
        return {success: true, message: "Account is created", statusCode: 201, user: newUserDetails, authToken: authToken}
    }

    reply.status(400)
    return {success: false, error: "Something went wrong", statusCode: 400}

}, "sign controller error")