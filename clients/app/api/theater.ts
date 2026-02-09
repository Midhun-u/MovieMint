'use server'

import { Theater } from "@/types/theater";
import { envVariables } from "@/utils/envVariables";
import * as zod from 'zod'
import { fetchInstance } from "./fetch";
import { handleError } from "@/utils/handleError";

const THEATER_BASE_URL = envVariables.THEATER_URL

// Api for registering theater
export const registerTheaterApi = handleError(async (data: Theater, authToken: string) => {

    if (!authToken) return { success: false }

    const theaterDataObj = zod.object({
        theaterName: zod.string().min(3).max(25).nonempty().trim(),
        theaterLocation: zod.string().min(5).max(100).nonempty().trim(),
        formats: zod.array(zod.string()).min(2),
        layoutNumber: zod.number().min(1).max(3),
        setsNumber: zod.number().min(1).max(4),
        rowsNumber: zod.number().min(1).max(5),
        seatsNumber: zod.number().min(1).max(7),
        allowCancellation: zod.boolean()
    })

    const fields = theaterDataObj.parse(data)

    const result = await fetchInstance(THEATER_BASE_URL, "/add-theater-registration", "POST", fields, "json", authToken)
    return result

})

// Api for deleting theater registration
export const deleteTheaterRegistrationApi = handleError(async (theaterId: string, authToken: string) => {

    const result = await fetchInstance(
        THEATER_BASE_URL,
        `/delete-theater-registration/${theaterId}`,
        "DELETE",
        {},
        "json",
        authToken
    )

    return result

})

// Api for getting theater
export const getTheaterApi = handleError(async (authToken: string) => {

    const result = await fetchInstance(
        THEATER_BASE_URL, 
        "/get-theater-registration",
        "GET",
        {},
        "json",
        authToken
    )

    return result

})