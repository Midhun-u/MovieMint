import express from 'express'
import { upload } from '../config/multer.js'
import { uploadMovieImageController } from '../controllers/uploadMovieImage.controller.js'
import { deleteMovieImageController } from '../controllers/deleteMovieImage.controller.js'
import { adminAuthMiddleware } from '../middlewares/adminAuth.js'
import { getMovieImageController } from '../controllers/getMovieImage.controller.js'
import { updateMovieImageController } from '../controllers/updateMovieImage.controller.js'
import { getActorsImagesController } from '../controllers/getActorsImages.controller.js'

// Movie image router
export const movieRouter = express()

// Route for uploading movie image
movieRouter.post("/upload-image", adminAuthMiddleware, upload.single("file"), uploadMovieImageController)

// Route for deleting movie image
movieRouter.delete("/delete-image/:movieId/:type", adminAuthMiddleware, deleteMovieImageController)

// Route for getting movie image
movieRouter.get("/get-image/:type/:movieId", getMovieImageController)

// Route for updating movie image
movieRouter.patch("/update-image/:type/:movieId", adminAuthMiddleware, upload.single("file"), updateMovieImageController)

// Route for getting movie actors images
movieRouter.get("/get-actors-images/:movieId", getActorsImagesController)