import { type FastifyInstance } from "fastify";
import { signController } from "../controllers/sign.controller.js";

// Auth routes
export const authRoutes = (fastify: FastifyInstance) => {

    fastify.post("/sign", signController)

}