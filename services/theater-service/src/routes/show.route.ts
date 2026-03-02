import { Hono } from "hono";
import { addShowController } from "../controllers/addShow.controller";
import { authMiddleware } from "../middlewares/auth";

// Show router
export const showRouter = new Hono()
// Applying middleware
showRouter.use(authMiddleware)

// Route for adding show
showRouter.post("/add-show", addShowController)