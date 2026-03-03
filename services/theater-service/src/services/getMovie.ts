import { envVariables } from "../utils/envVariables"
import { fetchInstance } from "./fetch"

// Function for fetching movie details
export const getMovie = async (movieId: string) => {

    try {
        
        const result = await fetchInstance(envVariables.MOVIE_SERVICE_URL, `/get-movie/${movieId}`, "GET", null)
        return result

    } catch (error: any) {
        return {success: false, error: error.message}
    }

}