import { Hono } from "hono"
import { addMovieController } from "../controllers/addMovie.controller"
import { adminAuthMiddleware } from "../middlewares/adminAuth"
import { deleteMovieController } from "../controllers/deleteMovie.controller"

// Movie router
export const movieRouter = new Hono()

// Middlewares
movieRouter.use(adminAuthMiddleware)

// Route for adding movie
movieRouter.post("/add-movie", addMovieController)

// Route for deleting movie
movieRouter.delete("/delete-movie/:movieId", deleteMovieController)