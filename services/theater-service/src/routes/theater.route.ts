import { Hono } from "hono";
import { addTheatereRegisterController } from "../controllers/theater/addTheaterRegistration.controller";
import { authMiddleware } from "../middlewares/auth";
import { deleteTheaterRegistrationController } from "../controllers/theater/deleteTheaterRegistration.controller";
import { getTheaterRegistrationController } from "../controllers/theater/getTheaterRegistration.controller";
import { getTheaterRequestsController } from "../controllers/theater/getTheaterRequests.controller";
import { approveTheaterController } from "../controllers/theater/approveTheater.controller";
import { getTheaterDetailsController } from "../controllers/theater/getTheaterDetails.controller";
import { getDashboardLogsController } from "../controllers/theater/getDashboardLogs.controller";
import { getTheatersController } from "../controllers/theater/getTheaters.controller";
import { updateTheaterController } from "../controllers/theater/updateTheater.controller";

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

// Route for getting dashboard logs
theaterRouter.get("/get-dashboard-logs", getDashboardLogsController)

// Route for getting theaters
theaterRouter.get("/get-theaters", getTheatersController)

// Route for updating theater details
theaterRouter.patch("/update-theater/:theaterId", updateTheaterController)