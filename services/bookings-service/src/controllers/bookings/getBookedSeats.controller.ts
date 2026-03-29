import type { Context } from "hono"
import { BookingsModel } from "../../models/bookings.model.js"

// Controller for getting booked seats
export const getBookedSeatsController = async (context: Context) => {

    const {showId} = context.req.param()

    if(!showId){
        context.status(400)
        return context.json({success: false, error: "Show id is required", statusCode: 400})
    }

    const bookedSeats = await BookingsModel.getBookedSeatsByShowId(showId)

    return context.json({success: true, bookedSeats: bookedSeats, statusCode: 200})

}