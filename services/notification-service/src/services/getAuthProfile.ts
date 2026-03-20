import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for getting auth profile
export const getAuthProfile = async (authToken: string) => {

    const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, "/auth-profile", "GET", null, authToken)
    return result

}