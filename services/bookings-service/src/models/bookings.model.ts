import { Bookings } from "../schemas/bookings.schema.js";
import type { BookingsBody } from "../types/bookingsBody.js";
import type { SeatType } from "../types/seatType.js";

// Bookings model
export const BookingsModel = {

    addBookings: async (data: BookingsBody & {
        userId: string,
        status: "COMPLETED" | "CANCELLED"
    }) => {

        const newBookings = await Bookings.create({
           theater_id: data.theaterId.trim(),
           user_id: data.userId.trim(),
           movie_id: data.movieId.trim(),
           show_id: data.showId.trim(),
           status: data.status.trim(),
           booked_seats: data.bookedSeats 
        })

        return newBookings

    },

    getBookingsByShowIdAndSeat: async (showId: string, seats: Array<SeatType>) => {

        const show = await Bookings.findOne({
            show_id: showId,
            booked_seats: {
                $in: [...seats]
            }
        }).lean()

        return show

    },

    getBookedSeatsByShowId: async (showId: string) => {

        const bookedSeats = await Bookings.aggregate([
            {
                $match: {
                    show_id: showId,
                    status: "COMPLETED"
                }
            },
            {
                $project: {
                    booked_seats: 1
                }
            }
        ])

        return bookedSeats

    }

}