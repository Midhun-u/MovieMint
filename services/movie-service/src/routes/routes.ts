import { Hono } from "hono"
import { addMovieController } from "../controllers/addMovie.controller"

// Movie router
export const movieRouter = new Hono()

// Route for adding movie
movieRouter.post("/add-movie", addMovieController)