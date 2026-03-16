import type { FastifyInstance } from "fastify";
import { addRateController } from "../controllers/rate/addRate.controller.js";
import { authenticationHook } from "../hooks/auth.hook.js";
import { getRateController } from "../controllers/rate/getRate.controller.js";

// Rate Routes
export const rateRoutes = (fastify: FastifyInstance) => {
    
    // Route for adding rate
    fastify.post("/add-rate", {onRequest: authenticationHook}, addRateController)

    // Route for getting rate
    fastify.get("/get-rate/:movieId", {onRequest: authenticationHook}, getRateController)

}