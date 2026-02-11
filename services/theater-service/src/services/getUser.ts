import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for getting auth profile
export const getUser = async (userId: string) => {

    try {

        const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, `/get-user/${userId}`, "GET", null)
        return result

    } catch (error: any) {
        return { success: false, error: error.message }
    }

}