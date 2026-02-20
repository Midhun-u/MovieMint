import { Hono } from "hono"
import { addMovieController } from "../controllers/addMovie.controller"
import { adminAuthMiddleware } from "../middlewares/adminAuth"
import { deleteMovieController } from "../controllers/deleteMovie.controller"
import { getMoviesController } from "../controllers/getMovies.controller"
import { getMovieController } from "../controllers/getMovie.controller"
import { updateMovieController } from "../controllers/updateMovie.controller"

// Movie router
export const movieRouter = new Hono()

// Middlewares
movieRouter.use(adminAuthMiddleware)

// Route for adding movie
movieRouter.post("/add-movie", addMovieController)

// Route for deleting movie
movieRouter.delete("/delete-movie/:movieId", deleteMovieController)

// Route for getting movies
movieRouter.get("/get-movies", getMoviesController)

// Route for getting specific movie
movieRouter.get("/get-movie/:movieId", getMovieController)

// Route for updating movie
movieRouter.patch("/update-movie/:movieId", updateMovieController)

// Route for adding banner
movieRouter.post("/add-banner", )