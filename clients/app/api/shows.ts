'use server'

import { handleError } from "@/utils/handleError"
import { fetchInstance } from "./fetch"
import { envVariables } from "@/utils/envVariables"

const SHOW_BASE_URL = envVariables.SHOW_URL

// Api for getting all shows
export const getAllShowsApi = handleError(async (movieId: string, day: number, page: number, limit: number) => {

    const result = await fetchInstance(SHOW_BASE_URL, `/get-all-theaters-shows/${movieId}/${day}/?page=${page}&limit=${limit}`, "GET", {}, "json")
    return result

})

// Api for getting specific show
export const getShowApi = handleError(async (id: string) => {

    const result = await fetchInstance(SHOW_BASE_URL, `/get-show/${id}`, "GET", {}, "json")
    return result

})