import { type FastifyReply, type FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import { UserModel } from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtp } from "../utils/sendOtp.js";
import { redisClient } from "../config/redis.js";

// Controller for sending OTP
export const sendOtpController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {email} = request.body as {email: string} || {}

    if(!email){
        reply.status(400)
        return {success: false, error: "Email must be provided", statusCode: 400}
    }

    // Checking if user signed
    const user = await UserModel.getUserByEmail(email.trim())

    if(!user){
        reply.status(404)
        return {success: false, error: "User is not found", statusCode: 404}
    }

    // Generating OTP
    const otpDigits = generateOtp(6, 5)
    const result = await sendOtp(user.email, otpDigits, 5)

    if(result?.error){

        reply.status(400)
        return {success: false, error: "Something went wrong", statusCode: 400}

    }

    // Store OTP in redis
    await redisClient.set(email, otpDigits, {
        condition: "NX", // Set if the key doesn't exists
        expiration: {
            type: "EX",
            value: 5 * 60 // Set expire time for 5 minute 
        }
    })

    reply.status(201)
    return {success: true, message: "OTP sent to the mail", statusCode: 201}

}, "sendOtpController error")