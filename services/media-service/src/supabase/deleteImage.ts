import { supabase } from "../config/supabase.js"
import type { SupabaseBucketName } from "../types/supabaseBucketName.js"

// Function for deleting image
export const deleteImage = async (path: string, bucketName: SupabaseBucketName) => {

    // For removing leading "./" from the path (eg: "./image/profile.jpg" --> "image/profile.jpg")
    const pathRegex = /^\.\//
    const formattedPath = path.replace(pathRegex, "")

    const { data, error } = await supabase.storage.from(bucketName).remove([formattedPath])
    return {data, error}

}