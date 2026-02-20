import { supabase } from "../config/supabase.js";
import type { ContentType } from "../types/imageType.js";
import type { SupabaseBucketName } from "../types/supabaseBucketName.js";
import { deleteFileFromDisk } from "../utils/fileOperations.js";

type FileType = Blob | File | ArrayBuffer | Buffer | ReadableStream

// Function for updating image
export const updateImage = async (
    path: string,
    bucketName: SupabaseBucketName,
    file: FileType,
    filePath: string,
    contentType: ContentType
) => {

    const {data, error} = await supabase.storage.from(bucketName).upload(path, file, {
        contentType: contentType,
        upsert: true
    })

    // Deleting file from disk
    await deleteFileFromDisk(filePath)

    return {data, error}

}