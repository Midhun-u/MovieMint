import { Hono } from "hono";
import { addTheatereRegisterController } from "../controllers/addTheaterRequest.controller";
import { theaterOwnerAuthMiddleware } from "../middlewares/theaterOwnerAuth";
import { deleteTheaterRegistrationController } from "../controllers/deleteTheaterRegistration.controller";

// Theater router
export const theaterRouter = new Hono()

// Applying authentication middleware
theaterRouter.use(theaterOwnerAuthMiddleware)

// Route for adding theater registration
theaterRouter.post("/add-theater-registration", addTheatereRegisterController)

// Route for deleting theater registration
theaterRouter.delete("/delete-theater-registration/:theaterId", deleteTheaterRegistrationController)