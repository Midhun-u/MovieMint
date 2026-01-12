import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { GoogleSignBody } from "../types/body.js";
import { validateBody } from "../utils/validateBody.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { uploadUserProfile } from "../service/uploadImage.js";

// Controller for google signing
export const googleSignController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const { firstname, lastname, email, profilePic, role } = await request.body as GoogleSignBody

    // Validating body
    const result = validateBody("GOOGLE_SIGN", request.body as GoogleSignBody)

    if (!result.success) {

        reply.status(400)
        return { success: false, error: result.errorMessage, statusCode: 400 }

    }

    // Checking if the email already exists
    const user = await UserModel.getUserByEmail(email)

    if (user) {

        reply.status(409)
        return { success: false, error: "Email already exists", statusCode: 409 }

    }

    const newUser = await UserModel.addUser({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        auth_type: "GOOGLE",
        role: role
    })

    if(newUser){

        // Uploading user image
        const data = await uploadUserProfile({ imageUrl: profilePic, userId: newUser.id})

        if(data.success){

            // Generating token
            const authToken = await generateToken(reply, {
                id: newUser.id,
                name: `${newUser.firstname} ${newUser.lastname}`,
                email: newUser.email,
                role: newUser.role
            })
    
            reply.status(201)
            return {success: true, message: "Account is created", statusCode: 201, user: newUser, authToken: authToken}

        }else{

            await UserModel.deleteUser(newUser.id)

            reply.status(502)
            return {success: false, statusCode: 502, error: "Something went wrong"}

        }


    }

    reply.status(400)
    return {success: false, error: "Something went wrong", statusCode: 400}


}, "google sign controller error")