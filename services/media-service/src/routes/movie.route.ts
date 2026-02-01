import express from 'express'
import { upload } from '../config/multer.js'
import { uploadMovieImageController } from '../controllers/uploadMovieImage.controller.js'

// Movie image router
export const movieRouter = express()

// Route for uploading poster
movieRouter.post("/upload-image", upload.single("file"), uploadMovieImageController)