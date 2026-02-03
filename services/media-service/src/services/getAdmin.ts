import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for getting admin
export const getAdmin = async (authToken: string) => {

    const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, "/get-profile", "GET", null, authToken)
    return result

}