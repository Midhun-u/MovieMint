import express from 'express'
import { upload } from '../config/multer.js'
import { uploadMovieImageController } from '../controllers/uploadMovieImage.controller.js'
import { deleteMovieImageController } from '../controllers/deleteMovieImage.controller.js'

// Movie image router
export const movieRouter = express()

// Route for uploading movie image
movieRouter.post("/upload-image", upload.single("file"), uploadMovieImageController)

// Route for deleting movie image
movieRouter.delete("/delete-image/:imageId/:type", deleteMovieImageController)