import type { FastifyInstance } from "fastify";
import { addRateController } from "../controllers/rate/addRate.controller.js";
import { authenticationHook } from "../hooks/auth.hook.js";
import { getRateController } from "../controllers/rate/getRate.controller.js";
import { deleteRateController } from "../controllers/rate/deleteRate.controller.js";
import { getRatingsDetailsController } from "../controllers/rate/getRatingsDetails.controller.js";
import { updateRateController } from "../controllers/rate/updateRate.controller.js";
import { getRatingsController } from "../controllers/rate/getRatings.controller.js";
import { getMostRatingsController } from "../controllers/rate/getMostRatings.controller.js";

// Rate Routes
export const rateRoutes = (fastify: FastifyInstance) => {
    
    // Route for adding rate
    fastify.post("/add-rate", {onRequest: authenticationHook}, addRateController)

    // Route for getting rate
    fastify.get("/get-rate/:movieId", {onRequest: authenticationHook}, getRateController)

    // Route for deleting rate
    fastify.delete("/delete-rate/:id", {onRequest: authenticationHook}, deleteRateController)
    
    // Route for getting ratings details
    fastify.get("/get-rate-details/:movieId", getRatingsDetailsController)

    // Route for updating rate
    fastify.patch("/update-rate/:id", {onRequest: authenticationHook}, updateRateController)

    // Route for getting rates
    fastify.get("/get-ratings/:movieId", {onRequest: authenticationHook}, getRatingsController)

    // Route for getting most rate
    fastify.get("/get-most-ratings", getMostRatingsController)

}