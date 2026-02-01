import { supabase } from "../config/supabase.js"
import type { SupabaseBucketName } from "../types/supabaseBucketName.js"

// Function for getting public url
export const getImage = async (
    filePath: string,
    bucketName: SupabaseBucketName
) => {

    try {
        
        const {data} = await supabase.storage.from(bucketName).getPublicUrl(filePath)
        return {publicUrl: data.publicUrl}

    } catch (error) {
        return {error: error}
    }

}