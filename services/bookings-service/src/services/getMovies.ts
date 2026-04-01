import { envVariables } from "../utils/envVariables.js"
import { fetchInstance } from "./fetch.js"

// Function for fetching movies
export const getMovies = (movieIds: Array<string>) => {

    const result = fetchInstance(envVariables.MOVIE_SERVICE_URL, "/get-movie-details-batch", "POST", {
        movieIds: movieIds
    })

    return result

}