"use server"

import { envVariables } from "@/utils/envVariables"
import { handleError } from "@/utils/handleError"
import { fetchInstance } from "./fetch"

const BOOKINGS_BASE_URL = envVariables.BOOKINGS_URL

// Api for booking seats
export const bookSeatApi = handleError(async ({
    bookedSeats,
    showId,
    movieId,
    theaterId,
    authToken,
}: {
    bookedSeats: Array<{
        layoutNumber: number,
        seatNumber: number,
        rowNumber: number,
        setNumber: number
    }>,
    theaterId: string
    movieId: string
    showId: string,
    authToken: string
}) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/add-bookings`, "POST", {
        showId: showId,
        theaterId: theaterId,
        bookedSeats: bookedSeats,
        movieId: movieId
    }, "json", authToken)

    return result

})