import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { RateModel } from "../../models/rate.model.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";

// Controller for getting rate details
export const getRatingsDetailsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const { movieId } = request.params as { movieId: string }

    if (!movieId) {
        reply.status(400)
        return { success: false, error: "Movie id is required", statusCode: 400 }
    }

    const rateDetails = await RateModel.getRateDetailsByMovieId(movieId)

    return {
        success: true,
        ratingsDetails: {
            totalRatings: convertStringToNumber(rateDetails.totalRatings, true),
            averageRatings: rateDetails.averageRatings? convertStringToNumber(rateDetails.averageRatings, false): 0
        },
        statusCode: 200
    }

}, "getRatingsDetailsController error")