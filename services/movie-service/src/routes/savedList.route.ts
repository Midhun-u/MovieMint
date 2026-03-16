import { Hono } from "hono";
import { addSavedListController } from "../controllers/savedList/addSavedList.controller";
import { userAuthMiddleware } from "../middlewares/userAuth";
import { getSavedItemController } from "../controllers/savedList/getSavedItem.controller";
import { deleteSavedListController } from "../controllers/savedList/deleteSavedList.controller";

// Saved list router
export const savedListRouter = new Hono()

// Applying middleware
savedListRouter.use(userAuthMiddleware)

// Route for adding movie to saved list
savedListRouter.post("/add-movie", addSavedListController)

// Route for getting movie from saved list
savedListRouter.get("/get-movie/:movieId", getSavedItemController)

// Route for deleting movie from saved list
savedListRouter.delete("/delete-movie/:id", deleteSavedListController)