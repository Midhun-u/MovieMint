import { supabase } from "../config/supabase.js"
import type { SupabaseBucketName } from "../types/supabaseBucketName.js"

// Function for deleting image
export const deleteImage = async (path: string, bucketName: SupabaseBucketName) => {

    
    const { data, error } = await supabase.storage.from(bucketName).remove([path])
    return {data, error}

}