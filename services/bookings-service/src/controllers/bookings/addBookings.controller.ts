import type { Context } from "hono";
import type { BookingsBody } from "../../types/bookingsBody.js";
import { bookingsBodyValidator } from "../../validator/bookingsBodyValidator.js";
import { BookingsModel } from "../../models/bookings.model.js";

// Controller for creating bookings
export const addBookingsController = async (context: Context) => {

    const body = await context.req.json() as BookingsBody || {}
    const user = context.get("auth")
    
    const {success, errorMessage, fields} = bookingsBodyValidator(body)
    if(!success || errorMessage || !fields){
        context.status(400)
        return context.json({success: false, error: "Invalid fields", statusCode: 400})
    }

    // Checking if seats are already booked
    const bookings = await BookingsModel.getBookingsByShowIdAndSeat(fields.showId, fields.bookedSeats)
    if(bookings){
        context.status(409)
        return context.json({success: false, error: "Seats are already occupied", statusCode: 409})
    }

    const newBookings = await BookingsModel.addBookings({
        userId: user.id,
        theaterId: fields.theaterId,
        movieId: fields.movieId,
        showId: fields.showId,
        bookedSeats: fields.bookedSeats,
        status: "COMPLETED",
        price: fields.price
    })

    if(newBookings){
        context.status(201)
        return context.json({success: true, message: "Movie is booked", bookings: newBookings, statusCode: 201})
    }

    return context.json({success: true})

}