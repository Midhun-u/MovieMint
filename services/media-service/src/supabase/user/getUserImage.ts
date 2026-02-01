import { supabase } from "../../config/supabase.js"

// Function for getting public url
export const getUserImage = async (
    filePath: string
) => {

    try {
        
        const {data} = await supabase.storage.from("users").getPublicUrl(filePath)
        return {publicUrl: data.publicUrl}

    } catch (error) {
        return {error: error}
    }

}