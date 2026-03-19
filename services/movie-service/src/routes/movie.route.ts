import { Hono } from "hono"
import { addMovieController } from "../controllers/movie/addMovie.controller"
import { adminAuthMiddleware } from "../middlewares/adminAuth"
import { deleteMovieController } from "../controllers/movie/deleteMovie.controller"
import { getMoviesController } from "../controllers/movie/getMovies.controller"
import { getMovieController } from "../controllers/movie/getMovie.controller"
import { updateMovieController } from "../controllers/movie/updateMovie.controller"
import { addBannerController } from "../controllers/banner/addBanner.controller"
import { getBannerController } from "../controllers/banner/getBanner.controller"
import { removeBannerController } from "../controllers/banner/removeBanner.controller"
import { getTotalBannerCountController } from "../controllers/banner/getTotalBannerCount.controller"
import { getAllBannersController } from "../controllers/banner/getAllBanners.controller"
import { getDashboardLogsController } from "../controllers/movie/getDashboardLogs.controller"
import { getRecommendedMoviesController } from "../controllers/movie/getRecommendedMovies.controller"
import { getMovieDetailsBatch } from "../controllers/movie/getMovieDetailsBatch.controller"

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

// Route for getting movie details for batch request
movieRouter.post("/get-movie-details-batch", getMovieDetailsBatch)

// Route for getting specific movie
movieRouter.get("/get-movie/:movieId", getMovieController)

// Route for updating movie
movieRouter.patch("/update-movie/:movieId", updateMovieController)

// Route for adding banner
movieRouter.post("/add-banner", addBannerController)

// Route for getting banner
movieRouter.get("/get-banner/:movieId", getBannerController)

// Route for getting all banners
movieRouter.get("/get-all-banners", getAllBannersController)

// Route for removing banner
movieRouter.delete("/remove-banner/:id", removeBannerController)

// Route for getting total banner count
movieRouter.get("/get-banner-count", getTotalBannerCountController)

// Route for getting bashboard logs
movieRouter.get("/get-dashboard-logs", getDashboardLogsController)

// Route for getting recommended movies
movieRouter.get("/get-recommended-movies/:movieId", getRecommendedMoviesController)