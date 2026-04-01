import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for getting theaters
export const getTheaters = async (ids: Array<string>) => {

    const result = await fetchInstance(envVariables.THEATER_SERVICE_URL, "/get-batch-theaters", "POST", {
        theaterIds: ids
    })
    
    return result

}