import express from 'express'
import { uploadUserImageController } from '../controllers/user/uploadUserImage.controller.js'
import { upload } from '../config/multer.js'
import { getUserImageController } from '../controllers/user/getUserImage.controller.js'
import { updateUserImageController } from '../controllers/user/updateUserImage.controller.js'

// User Images router
export const userImageRouter = express()

// Route for uploading user images
userImageRouter.post("/upload-image", upload.single("file"), uploadUserImageController)

// Route for getting user image
userImageRouter.get("/get-image/:userId", getUserImageController)

// Route for updating user image
userImageRouter.patch("/update-image", upload.single("file"), updateUserImageController)