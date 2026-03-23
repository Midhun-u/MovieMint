'use server'

import { envVariables } from "@/utils/envVariables";
import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";

const SAVED_LIST_BASE_URL = envVariables.SAVED_LIST_URL

// Api for adding to saved list
export const addMovieToSavedListApi = handleError(async (movieId: string, authToken: string) => {

    const result = await fetchInstance(SAVED_LIST_BASE_URL, "/add-movie", "POST", {
        movieId: movieId
    }, "json", authToken)

    return result

})

// Api for getting movie from saved list
export const getSavedItemApi = handleError(async (movieId: string, authToken: string) => {

    const result = await fetchInstance(SAVED_LIST_BASE_URL, `/get-movie/${movieId}`, 'GET', {}, "json", authToken)
    return result

})

// Api for removing movie from saved list
export const deleteSavedItemApi = handleError(async (id: string, authToken: string) => {

    const result = await fetchInstance(SAVED_LIST_BASE_URL, `/delete-movie/${id}`, "DELETE", {}, "json", authToken)
    return result

})

// Api for get saved list
export const getSavedListApi = handleError(async (page: number, limit: number, authToken: string) => {

    const result = await fetchInstance(SAVED_LIST_BASE_URL, `/get-saved-list/?page=${page}&limit=${limit}`, "GET", {}, "json", authToken)
    return result

})