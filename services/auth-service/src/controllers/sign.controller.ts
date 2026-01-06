import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";
import type { SignBody } from "../types/signBody.js";

// Controller for signing
export const signController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {fistname, lastname, email, password, role, adminKey} = await request.body as SignBody
    

}, "sign controller error")