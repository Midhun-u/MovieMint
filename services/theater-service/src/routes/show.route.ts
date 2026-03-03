import { Hono } from "hono";
import { addShowController } from "../controllers/addShow.controller";
import { authMiddleware } from "../middlewares/auth";
import { getShowsController } from "../controllers/getShows.controller";

// Show router
export const showRouter = new Hono()

// Applying middleware
showRouter.use(authMiddleware)

// Route for adding show
showRouter.post("/add-show", addShowController)

// Route for getting shows
showRouter.get("/get-shows/:theaterId", getShowsController)