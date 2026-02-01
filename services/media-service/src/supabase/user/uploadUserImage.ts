import { supabase } from "../../config/supabase.js"
import type { ContentType } from "../../types/imageType.js"
import { deleteFileFromDisk } from "../../utils/fileOperations.js"

type FileType = Blob | File | ArrayBuffer | Buffer | ReadableStream

// Function for uploading image
export const uploadUserImage = async (
    userId: string, 
    path: string, 
    extname: string, 
    file: FileType, 
    contentType: ContentType
) => {

    const filePath = `/profile/${userId + `-` + crypto.randomUUID()}${extname}`

    const {data, error} = await supabase.storage.from("users").upload(filePath, file, {
        contentType: contentType
    })

    if(error || data){

        // Deleting file from disk
        deleteFileFromDisk(path)

    }
    
    return {data, error}

}