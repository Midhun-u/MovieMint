import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for getting movie image
export const getMovieImage = async (type: "poster" | "banner", movieId: string) => {

    const result = await fetchInstance(envVariables.MEDIA_SERVICE_URL, `/get-image/${type}/${movieId}`, "GET", null, null)
    return result

} 