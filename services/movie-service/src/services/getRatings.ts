import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for fetching rate details
export const getRatings = async (movieId: string) => {

    const result = await fetchInstance(envVariables.RATE_SERVICE_URL, `/get-rate-details/${movieId}`, "GET", null, null)
    return result

}