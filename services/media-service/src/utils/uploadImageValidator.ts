import type { UploadImageBody } from "../types/uploadImageBody.js"
import * as zod from 'zod'

// Function for validating uploaded image
export const validateUploadImage = (body: UploadImageBody) => {

    try {
        
        const bodyObj = zod.object({
            imageUrl: zod.string().nonempty(),
            userId: zod.string().nonempty()
        })

        bodyObj.parse(body)

        return true

    } catch (error) {
        console.log(error)
    }

}