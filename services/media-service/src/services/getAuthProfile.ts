import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for getting auth profile
export const getAuthProfile = async (authToken: string) => {

    const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, "/auth-profile", "GET", null, authToken)
    return result

}