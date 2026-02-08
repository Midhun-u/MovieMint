import { Hono } from "hono";
import { addTheatereRegisterController } from "../controllers/addTheaterRegistration.controller";
import { authMiddleware } from "../middlewares/auth";
import { deleteTheaterRegistrationController } from "../controllers/deleteTheaterRegistration.controller";
import { getTheaterRegistrationController } from "../controllers/getTheaterRegistration.controller";

// Theater router
export const theaterRouter = new Hono()

// Applying authentication middleware
theaterRouter.use(authMiddleware)

// Route for adding theater registration
theaterRouter.post("/add-theater-registration", addTheatereRegisterController)

// Route for deleting theater registration
theaterRouter.delete("/delete-theater-registration/:theaterId", deleteTheaterRegistrationController)

// Route for getting theater registration
theaterRouter.get("/get-theater-registration", getTheaterRegistrationController)