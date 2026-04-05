import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for fetching show
export const getShows = async (showIds: Array<string>) => {

    const shows = await Promise.all(showIds.map(async (showId) => {
        const result = await fetchInstance(envVariables.SHOW_SERVICE_URL, `/get-show/${showId}`, "GET", {})
        return result.show
    }) || [])

    return shows

}