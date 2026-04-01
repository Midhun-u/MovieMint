import type { Context } from "hono";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { BookingsModel } from "../../models/bookings.model.js";
import { getMovies } from "../../services/getMovies.js";
import { getTheaters } from "../../services/getTheaters.js";

// Controller for getting user bookings
export const getUserBookingsController = async (context: Context) => {

    const user = context.get("auth")
    const {page = 1, limit = 10, status=""} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    // /get-movie-details-batch
    const bookings = await BookingsModel.getBookingsByUserId(user.id, pageNumber, limitNumber, status)
    const {movies} = await getMovies(bookings.map(booking => booking.movie_id))
    const {theaters} = await getTheaters(bookings.map(booking => booking.theater_id))
    console.log("Theaters: ", theaters)

    const bookingsDetails = await Promise.all(bookings.map(async booking => {

        console.log(booking.theater_id)
        const movieDetails = movies?.find((movie: {_id: string}) => movie._id === booking.movie_id) 
        const theaterDetails =  theaters?.find((theater: {id: string}) => theater.id === booking.theater_id)

    }) || [])

    return context.json({success: false, bookings: bookingsDetails.length? bookingsDetails: bookings, statusCode: 200})

}