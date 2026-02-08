import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for getting theater image
export const getTheaterImage = async (theaterId: string) => {

    try {
        
        const result = await fetchInstance(envVariables.MEDIA_SERVICE_URL, `/get-image/${theaterId}`, "GET", null, null)
        return result

    } catch (error: any) {
        return {success: false, errorMessage: error.message}
    }

}