import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for getting user
export const getUser = async (userId: string) => {

    const result = await fetchInstance(envVariables.AUTH_SERVICE_URL, `/get-user/${userId}`, "GET", {})
    return result 

}