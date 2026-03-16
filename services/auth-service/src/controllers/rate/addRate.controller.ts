import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { RateModel } from "../../models/rate.model.js";
import type { JWT_PAYLOAD } from "../../types/jwt.js";

// Controller for adding rate
export const addRateController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {
 
    const {rate, comment, movieId} = request.body as {rate: number | string, comment: string, movieId: string} || {}
    const rateNumber = convertStringToNumber(rate, false)
    const user = request.user as JWT_PAYLOAD

    if(!rateNumber || !movieId){
        reply.status(400)
        return {success: false, error: "All fields are required", statusCode: 400}
    }
    
    // Checking if rate is exist
    const userRate = await RateModel.getRateByMovieIdAndUserId(movieId, user.id)
    if(userRate){
        reply.status(409)
        return {success: false, error: "User is already rated", statusCode: 409}
    }

    const newRate = await RateModel.addRate({
        userId: user.id,
        movieId: movieId,
        rate: rateNumber,
        comment: comment
    })

    if(newRate){
        reply.status(201)
        return {success: true, message: "Successfully rated", rate: newRate, statusCode: 201}
    }

    reply.status(400)
    return {success: false, error: "Couldn't rated", statusCode: 400}

}, "addRateController error")