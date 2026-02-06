import { envVariables } from "../../utils/envVariables"
import { fetchInstance } from "../fetch"

// Function for getting theater owner 
export const getTheaterOwner = async (authToken: string) => {

    try {
        
        const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, "/get-profile", "GET", null, authToken)
        return result

    } catch (error: any) {
        return {success: false, error: error.message}
    }

}