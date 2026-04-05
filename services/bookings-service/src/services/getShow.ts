import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for fetching specific show
export const getShow = async (showId: string) => {

    const result = await fetchInstance(envVariables.SHOW_SERVICE_URL, `/get-show/${showId}`, "GET", {})
    return result

}