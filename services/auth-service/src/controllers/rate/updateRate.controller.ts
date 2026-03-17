import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import { RateModel } from "../../models/rate.model.js";

// Controller for updating rate
export const updateRateController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {id} = request.params as {id: string}
    const body = request.body as {rate?: number, comment: string, id: string, createdAt: string, updatedAt: string}

    if(!id){
        reply.status(400)
        return {success: false, error: "Id is required", statusCode: 400}
    }

    // Checking if rate exists
    const rate = await RateModel.getRateById(id)
    if(!rate){
        reply.status(404)
        return {success: false, error: "Rate is not found", statusCode: 404}
    }

    if(body.id || body.createdAt || body.updatedAt){
        reply.status(403)
        return {success: false, error: "These fields are not editable", statusCode: 403}
    }

    const updatedCount = await RateModel.updateRateById(id, body)
    if(updatedCount){
        return {success: true, message: "Rate is updated", statusCode: 200}
    }

}, "updateRateController error")