import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { RateModel } from "../../models/rate.model.js";

// Controller for deleting rate
export const deleteRateController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.params as {id: string}

    if(!id){
        reply.status(400)
        return {success: false, error: "Id is required", statusCode: 400}
    }

    // Checking if rate is exist
    const rate = await RateModel.getRateById(id)
    if(!rate){
        reply.status(404)
        return {success: false, error: "Rate is not found", statusCode: 404}
    }

    const deletedCount = await RateModel.deleteRateById(id)
    if(deletedCount){
        return {success: true, message: "Rate is deleted", statusCode: 200}
    }

    return {success: false, error: "Couldn't delete rate", statusCode: 200}

}, "deleteRateController error")