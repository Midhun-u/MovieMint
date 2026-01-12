import { type FastifyInstance } from "fastify";
import { signController } from "../controllers/sign.controller.js";
import { googleSignController } from "../controllers/googleSign.controller.js";
import { loginController } from "../controllers/login.controller.js";

// Auth routes
export const authRoutes = (fastify: FastifyInstance) => {

    // Route for signing
    fastify.post("/sign", signController)

    // Route for google signing
    fastify.post("/google-sign", googleSignController)

    // Route for login
    fastify.post("/login", loginController)

}