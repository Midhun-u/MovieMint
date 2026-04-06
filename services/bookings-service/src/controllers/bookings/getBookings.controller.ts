import type { Context } from "hono";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { BookingsModel } from "../../models/bookings.model.js";
import { getMovies } from "../../services/getMovies.js";
import { getTheaters } from "../../services/getTheaters.js";
import { getShows } from "../../services/getShows.js";
import { getUser } from "../../services/getUser.js";

// Controller for getting bookings
export const getBookingsController = async (context: Context) => {

    const { page = 1, limit = 10, status = "" } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const bookings = await BookingsModel.getBookings(pageNumber, limitNumber, status)
    const [{ movies }, { theaters }, shows] = await Promise.all([
        getMovies(bookings.map(booking => booking.movie_id)),
        getTheaters(bookings.map(booking => booking.theater_id)),
        getShows(bookings.map(booking => booking.show_id))
    ])

    const bookingsDetails = await Promise.all(bookings.map(async booking => {

        const authResult = await getUser(booking.user_id)
        const movie = movies?.find((movie: { _id: string }) => movie._id === booking.movie_id)
        const theater = theaters?.find((theater: { id: string }) => theater.id === booking.theater_id)
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
            },
            theater: theater,
        }

    }) || [])

    return context.json({
        success: true,
        bookings: bookingsDetails.length ? bookingsDetails : bookings,
        statusCode: 200
    })

}