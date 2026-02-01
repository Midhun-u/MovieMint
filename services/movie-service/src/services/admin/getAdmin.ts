import { envVariables } from "../../utils/envVariables"
import { fetchInstance } from "../fetch"

// Function for getting admin
export const getAdmin = async (authToken: string) => {

    const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, "/get-profile", "GET", null, authToken)
    return result

}