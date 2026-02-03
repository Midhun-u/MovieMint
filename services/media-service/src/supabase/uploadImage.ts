import { supabase } from "../config/supabase.js"
import type { ContentType } from "../types/imageType.js"
import type { SupabaseBucketName } from "../types/supabaseBucketName.js"
import { deleteFileFromDisk } from "../utils/fileOperations.js"

type FileType = Blob | File | ArrayBuffer | Buffer | ReadableStream

// Function for uploading image
export const uploadImage = async ({
    id,
    path,
    extname,
    file,
    bucketName,
    contentType
}: {
    id: string
    path: string
    extname: string
    file: FileType
    bucketName: SupabaseBucketName
    contentType: ContentType
}) => {

    const filePath = `./${id + "-" + crypto.randomUUID()}${extname}`

    const { data, error } = await supabase.storage.from(bucketName.trim()).upload(filePath, file, {
        contentType: contentType
    })

    // Deleting file from disk
    await deleteFileFromDisk(path)

    return { data, error }

}