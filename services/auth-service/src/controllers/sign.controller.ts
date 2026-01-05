import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";

// Controller for signing
export const signController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const body = await request.body
    console.log(body)

}, "sign controller error")