import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

// Storage
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./src/uploads")
    },
    filename: (request, file, callback) => {

        const uniqueName = `${Date.now() + `-` + crypto.randomUUID()}`
        const extname = path.extname(file.originalname)

        callback(null, uniqueName + extname)

    },
})

// Upload middleware
export const upload = multer({

    fileFilter(req, file, callback) {  // Checking if file contain supported mime type

        const supportedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"]

        const isSupport = supportedMimeTypes.some((mimeType) => file.mimetype === mimeType.trim())
        
        if(isSupport){
            return callback(null, true)
        }else{
            console.log("Image is not supported")
            callback(null, false)
        }

    },
    storage: storage,
})