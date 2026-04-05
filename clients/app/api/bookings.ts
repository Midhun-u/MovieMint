"use server"

import { envVariables } from "@/utils/envVariables"
import { handleError } from "@/utils/handleError"
import { fetchInstance } from "./fetch"
import { Seat } from "@/types/seat"

const BOOKINGS_BASE_URL = envVariables.BOOKINGS_URL

// Api for booking seats
export const bookSeatApi = handleError(async ({
    bookedSeats,
    showId,
    movieId,
    theaterId,
    authToken,
    price
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
    price: number
    authToken: string
}) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/add-bookings`, "POST", {
        showId: showId,
        theaterId: theaterId,
        bookedSeats: bookedSeats,
        movieId: movieId,
        price: price
    }, "json", authToken)

    return result

})

// Api for getting booked seats
export const getBookedSeatsApi = handleError(async (showId: string) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/get-booked-seats/${showId}`, "GET", {}, "json")
    return result

})

// Api for getting reserved seats
export const getReservedSeatsApi = handleError(async (showId: string) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/get-reserved-seats/${showId}`, "GET", {}, "json")
    return result

})

// Api for reserving seats
export const reserveSeatsApi = handleError(async (showId: string, seats: Array<Seat>, authToken: string) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/reserve-seats`, "POST", {
        showId: showId,
        seats: seats
    }, "json", authToken)

    return result

})

// Api for getting user bookings
export const getUserBookingsApi = handleError(async (page: number, limit:  number, status: string, authToken: string) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/get-user-bookings/?page=${page}&limit=${limit}&status=${status}`, "GET", {}, "json", authToken)
    return result

})

// Api for cancelling the booking
export const cancelBookingApi = handleError(async (bookingId: string) => {

    const result = await fetchInstance(BOOKINGS_BASE_URL, `/cancel-booking/${bookingId}`, "PATCH", {}, "json")
    return result

})