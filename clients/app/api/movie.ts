'use server'

import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";
import { envVariables } from "@/utils/envVariables";

const MOVIE_BASE_URL = envVariables.MOVIE_URL

// Api for getting banners
export const getBannersApi = handleError(async () => {

    const result = await fetchInstance(MOVIE_BASE_URL, "/get-all-banners", "GET", {}, "json")
    return result

})

// Api for getting movies
export const getMoviesApi = handleError(async (
    page: number = 1, 
    limit: number = 10, 
    searchQuery: string = "", 
    categories: Array<string> = [], 
    formats: Array<string> = [], 
    language: string = "",
    status: string = "",
    movieType?: "LIVE_ACTION" | "ANIMATED"
) => {

    const param = new URLSearchParams()

    categories.map((category) => param.append("categories", category))
    formats.map(format => param.append("formats", format))
    const query = param.toString()

    const result = await fetchInstance(MOVIE_BASE_URL, `/get-movies/?page=${page}&limit=${limit}&title=${searchQuery}&${query}&language=${language}&status=${status}&movieType=${movieType? movieType: ""}`, "GET", {}, "json")
    return result
})