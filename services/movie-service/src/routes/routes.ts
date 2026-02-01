import { Hono } from "hono"
import { addMovieController } from "../controllers/addMovie.controller"
import { adminAuthMiddleware } from "../middlewares/adminAuth"

// Movie router
export const movieRouter = new Hono()

// Middlewares
movieRouter.use(adminAuthMiddleware)

// Route for adding movie
movieRouter.post("/add-movie", addMovieController)