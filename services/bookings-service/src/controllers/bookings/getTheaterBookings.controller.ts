import type { Context } from "hono";
import { getTheaterByOwner } from "../../services/getTheaterByTheaterOwner.js";
import { BookingsModel } from "../../models/bookings.model.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { getUser } from "../../services/getUser.js";
import { getMovies } from "../../services/getMovies.js";
import { getShows } from "../../services/getShows.js";

// Controller for getting theater bookings
export const getTheaterBookingsController = async (context: Context) => {

    const authToken = context.req.header("Authorization") as string
    const { page = 1, limit = 10, status = "" } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const theaterResult = await getTheaterByOwner(authToken)
    if (!theaterResult.success || !theaterResult.theater) {
        context.status(502)
        return context.json({ success: false, error: "Couldn't get the theater" })
    }

    const bookings = await BookingsModel.getBookingsByTheaterId(theaterResult.theater.id, pageNumber, limitNumber, status)
    const [{ movies }, shows] = await Promise.all([
        getMovies(bookings.map(booking => booking.movie_id)),
        getShows(bookings.map(booking => booking.show_id))
    ])

    const bookingsDetails = await Promise.all(bookings.map(async booking => {

        const authResult = await getUser(booking.user_id)
        const movie = movies?.find((movie: { _id: string }) => movie._id === booking.movie_id)
        const showDetails = shows?.find((show: {
            _id: string,
            day: number
            hour: number
            minutes: number
            year: number
            month: number
        }) => show._id === booking.show_id)

        return {
            ...booking,
            movie: {
                ...movie
            },
            show: {
                day: showDetails.day,
                hour: showDetails.hour,
                minutes: showDetails.minutes,
                year: showDetails.year,
                month: showDetails.month,
            },
            user: {
                firstname: authResult?.user?.firstname,
                lastname: authResult?.user?.lastname,
                email: authResult?.user?.email,
                profile_image: authResult?.user?.profile_image
            }
        }

    }) || [])

    return context.json({ success: true, bookings: bookingsDetails.length ? bookingsDetails : bookings, statusCode: 200 })

}