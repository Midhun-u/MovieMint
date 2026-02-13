import { Hono } from "hono";
import { addTheatereRegisterController } from "../controllers/addTheaterRegistration.controller";
import { authMiddleware } from "../middlewares/auth";
import { deleteTheaterRegistrationController } from "../controllers/deleteTheaterRegistration.controller";
import { getTheaterRegistrationController } from "../controllers/getTheaterRegistration.controller";
import { getTheaterRequestsController } from "../controllers/getTheaterRequests.controller";
import { approveTheaterController } from "../controllers/approveTheater.controller";
import { getTheaterDetailsController } from "../controllers/getTheaterDetails.controller";

// Theater router
export const theaterRouter = new Hono()

// Applying authentication middleware
theaterRouter.use(authMiddleware)

// Route for adding theater registration
theaterRouter.post("/add-theater-registration", addTheatereRegisterController)

// Route for deleting theater registration
theaterRouter.delete("/delete-theater/:theaterId", deleteTheaterRegistrationController)

// Route for getting theater owner's theater registration
theaterRouter.get("/get-theater-registration", getTheaterRegistrationController)

// Route for getting theater details
theaterRouter.get("/get-theater/:theaterId", getTheaterDetailsController)

// Route for getting all theater request
theaterRouter.get("/get-theater-requests", getTheaterRequestsController)

// Route for approving theater
theaterRouter.patch("/approve-theater/:theaterId", approveTheaterController)