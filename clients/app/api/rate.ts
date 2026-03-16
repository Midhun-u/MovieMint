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
export const getRateApi = handleError(async (movieId: string) => {

    // const result = await 

})