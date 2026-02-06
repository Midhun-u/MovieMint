import { Hono } from "hono";
import { addTheaterRequestController } from "../controllers/addTheaterRequest.controller";
import { theaterOwnerAuthMiddleware } from "../middlewares/theaterOwnerAuth";

// Theater router
export const theaterRouter = new Hono()

// Applying authentication middleware
theaterRouter.use(theaterOwnerAuthMiddleware)

// Route for adding theater request
theaterRouter.post("/add-theater-request", addTheaterRequestController)