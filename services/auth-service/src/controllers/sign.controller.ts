import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { SignBody } from "../types/signBody.js";
import { validateBody } from "../utils/validateBody.js";

// Controller for signing
export const signController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {fistname, lastname, email, password, role, adminKey} = await request.body as SignBody

    // Validating body
    const result = validateBody("SIGN", request.body as SignBody)

    if(!result.success){

        reply.status(400)
        return {success: false, error: result.errorMessage, statusCode: 400}

    }

    
    

}, "sign controller error")