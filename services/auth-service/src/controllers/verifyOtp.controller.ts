import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handleError.js";

// Controller for verifying OTP
export const verifyOtpController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {



}, "verifyOtpController error")