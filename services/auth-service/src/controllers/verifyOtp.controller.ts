import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { UserModel } from "../models/user.model.js";
import { redisClient } from "../config/redis.js";
import { convertStringToNumber } from "../utils/convertStringToNumber.js";

// Controller for verifying OTP
export const verifyOtpController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {email, otp} = request.body as {email: string, otp: number | string} || {}
    const otpNumber = convertStringToNumber(otp)

    if(!email || !otp){

        reply.status(400)
        return {success: false, error: "Invalid fields", statusCode: 400}

    }

    // Check if user exists
    const user = await UserModel.getUserByEmail(email.trim())

    if(!user){

        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}

    }

    // Getting OTP from redis and checking if OTP is expired or not
    const userOtp = await redisClient.get(email)

    if(!userOtp){

        reply.status(400)
        return {success: false, error: "OTP is expired", statusCode: 400}

    }

    // Comparing OTP
    if(otpNumber === convertStringToNumber(userOtp)){

        // Deleting otp
        await redisClient.del(email)

        reply.status(200)
        return {success: true, message: "Email is verified", statusCode: 200, user: user}

    }else{

        reply.status(400)
        return {success: false, error: "Invalid OTP", statusCode: 400}

    }

}, "verifyOtpController error")