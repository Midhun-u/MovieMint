import type { Context } from "hono";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { BookingsModel } from "../../models/bookings.model.js";
import { getMovies } from "../../services/getMovies.js";
import { getTheaters } from "../../services/getTheaters.js";
import { getShows } from "../../services/getShows.js";

// Controller for getting user bookings
export const getUserBookingsController = async (context: Context) => {

    const user = context.get("auth")
    const { page = 1, limit = 10, status = "" } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const bookings = await BookingsModel.getBookingsByUserId(user.id, pageNumber, limitNumber, status)
    const [{ movies }, { theaters }, shows] = await Promise.all([
        getMovies(bookings.map(booking => booking.movie_id)),
        getTheaters(bookings.map(booking => booking.theater_id)),
        getShows(bookings.map(booking => booking.show_id))
    ])

    const bookingsDetails = await Promise.all(bookings.map(async booking => {

        const movieDetails = movies?.find((movie: { _id: string }) => movie._id === booking.movie_id)
        const theaterDetails = theaters?.find((theater: { id: string }) => theater.id === booking.theater_id)
        const showDetails = shows?.find((show: {
            _id: string,
            day: number
            hour: number
            minutes: number
            year: number
            month: number
        }) => show?._id === booking.show_id)

        return {
            _id: booking._id,
            movie: movieDetails,
            theater: theaterDetails,
            show: {
                day: showDetails.day,
                hour: showDetails.hour,
                minutes: showDetails.minutes,
                year: showDetails.year,
                month: showDetails.month,
            },
            booked_seats: booking.booked_seats,
            status: booking.status,
            price: booking.price,
            movie_id: booking.movie_id,
            theater_id: booking.theater_id,
            createdAt: booking.createdAt,
        }

    }) || [])

    return context.json({ success: true, bookings: bookingsDetails.length ? bookingsDetails : bookings, statusCode: 200 })

}