import { Hono } from "hono";
import { addShowController } from "../controllers/show/addShow.controller";
import { authMiddleware } from "../middlewares/auth";
import { getShowsController } from "../controllers/show/getShows.controller";
import { getShowController } from "../controllers/show/getShow.controller";
import { updateShowController } from "../controllers/show/updateShow.controller";
import { getAllTheatersShowsController } from "../controllers/show/getAllTheatersShows.controller";

// Show router
export const showRouter = new Hono()

// Applying middleware
showRouter.use(authMiddleware)

// Route for adding show
showRouter.post("/add-show", addShowController)

// Route for getting shows
showRouter.get("/get-shows/:theaterId", getShowsController)

// Route for getting specific show
showRouter.get("/get-show/:showId", getShowController)

// Route for updating show
showRouter.patch("/update-show/:showId", updateShowController)

// Route for all theater shows
showRouter.get("/get-all-theaters-shows/:movieId", getAllTheatersShowsController)