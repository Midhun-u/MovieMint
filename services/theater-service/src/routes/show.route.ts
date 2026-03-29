import { Hono } from "hono";
import { addShowController } from "../controllers/show/addShow.controller";
import { getShowsController } from "../controllers/show/getShows.controller";
import { getShowController } from "../controllers/show/getShow.controller";
import { updateShowController } from "../controllers/show/updateShow.controller";
import { getAllTheatersShowsController } from "../controllers/show/getAllTheatersShows.controller";
import { permittedAuthMiddleware } from "../middlewares/permittedAuth";
import { userAuthMiddleware } from "../middlewares/userAuth";

// Show router
export const showRouter = new Hono()

// Applying middleware
showRouter.use(permittedAuthMiddleware)
showRouter.use(userAuthMiddleware)

// Route for adding show
showRouter.post("/add-show", addShowController)

// Route for getting shows
showRouter.get("/get-shows/:theaterId", getShowsController)

// Route for getting specific show
showRouter.get("/get-show/:showId", getShowController)

// Route for updating show
showRouter.patch("/update-show/:showId", updateShowController)

// Route for all theater shows
showRouter.get("/get-all-theaters-shows/:movieId/:day", getAllTheatersShowsController)