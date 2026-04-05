import type { Context } from "hono";
import { BookingsModel } from "../../models/bookings.model.js";
import { getShow } from "../../services/getShow.js";

// Controller for cancelling bookings
export const cancelBookingController = async (context: Context) => {

    const {id} = context.req.param()
   
    // Checking if bookings exists
    const booking = await BookingsModel.getBookingById(id)
    if(!booking){
        context.status(404)
        return context.json({success: false, error: "Booking is not found", statusCode: 404})
    }

    const showResult = await getShow(booking.show_id)
    const {show} = showResult || {show: null}

    if(!show){
        context.status(502)
        return context.json({success: false, error: "Couldn't get the show", statusCode: 502})
    }

    const currentTime = new Date().getTime() + 10 * 60 * 1000 // Just adding 10 minutes extra
    const showTime = new Date(show?.year, show?.month, show?.day, show?.hour).getTime()
    if(currentTime <= showTime){

        const updatedBooking = await BookingsModel.updateBookingById(booking._id.toString(), {
            status: "CANCELLED"
        })

        if(updatedBooking){

            return context.json({success: true, error: "Show is cancelled", statusCode: 200})

        }else{
            context.status(400)
            return context.json({success: false, error: "Couldn't cancel the booking", statusCode: 400})
        }

    }

    context.status(400)
    return context.json({success: false, error: "Cannot cancel the show due to cancel time is exceeded", statusCode: 400})

} 