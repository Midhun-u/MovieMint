import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for getting theater by theater owner 
export const getTheaterByOwner = async (authToken: string) => {

    const result = await fetchInstance(envVariables.THEATER_SERVICE_URL, "/get-theater-registration", "GET", {}, authToken)
    return result

}