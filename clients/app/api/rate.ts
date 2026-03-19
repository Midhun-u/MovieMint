'use server'

import { envVariables } from "@/utils/envVariables";
import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";

const RATE_BASE_URL = envVariables.RATE_URL

// Api for adding rate
export const addRateApi = handleError(async ({
    movieId,
    rate,
    comment = "",
    authToken
}: {
    movieId: string,
    rate: number,
    comment: string,
    authToken: string
}) => {

    const result = await fetchInstance(RATE_BASE_URL, `/add-rate`, "POST", {
        movieId: movieId,
        rate: rate,
        comment: comment,
    }, "json", authToken)
    return result

})

// Api for getting rate
export const getRateApi = handleError(async (movieId: string, authToken: string) => {

    const result = await fetchInstance(RATE_BASE_URL, `/get-rate/${movieId}`, "GET", {}, "json", authToken)
    return result

})

// Api for getting ratings
export const getRatingsApi = handleError(async (movieId: string, page: number = 1, limit: number = 10, authToken: string) => {

    const result = await fetchInstance(RATE_BASE_URL, `/get-ratings/${movieId}?page=${page}&limit=${limit}`, "GET", {}, "json", authToken)
    return result

})

// Api for deleting rate
export const deleteRateApi = handleError(async (id: string, authToken: string) => {

    const result = await fetchInstance(RATE_BASE_URL, `/delete-rate/${id}`, "DELETE", {}, "json", authToken)
    return result

})

// Api for updating rate
export const updateRateApi = handleError(async (id: string, updatedBody: object, authToken: string) => {

    const result = await fetchInstance(RATE_BASE_URL, `/update-rate/${id}`, "PATCH", updatedBody, "json", authToken)
    return result

})

// Api for fetching most ratings
export const getMostRatingsApi = handleError(async () => {

    const result = await fetchInstance(RATE_BASE_URL, "/get-most-ratings", "GET", {}, "json")
    return result

})