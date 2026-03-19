import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { RateModel } from "../../models/rate.model.js";

// Controller for getting most rated movie
export const getMostRatingsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const mostRatings = await RateModel.getMostRated(20)
    return {success: true, mostRatings: mostRatings, statusCode: 200}
 
}, "getMostRatingsController error")