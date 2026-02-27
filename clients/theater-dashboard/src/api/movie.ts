import { handleError } from "../utils/handleError"
import { movieAxiosInstance } from "./axiosInstance"

// Api for getting movies
export const getMoviesApi = handleError(async (
    page: number = 1, 
    limit: number = 10, 
    searchQuery: string = "", 
    categories: Array<string> = [], 
    formats: Array<string> = [], 
    language: string = ""
) => {

    const params = new URLSearchParams()

    categories.map((category) => {
        params.append("categories", category)
    })

    formats.map((format) => {
        params.append("formats", format)
    })

  const result = (await movieAxiosInstance.get(`/get-movies/?page=${page}&limit=${limit}&title=${searchQuery || ""}&${params.toString()}&language=${language}`)).data
    return result

})

// Api for getting specific movie
export const getMovieApi = handleError(async (movieId: string) => {

    const result = (await movieAxiosInstance.get(`/get-movie/${movieId}`)).data
    return result

})