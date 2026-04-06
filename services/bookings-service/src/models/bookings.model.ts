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
            booked_seats: data.bookedSeats,
            price: data.price
        })

        return newBookings

    },

    getBookingById: async (id: string) => {

        const booking = await Bookings.findById(id).lean()
        return booking

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
                    booked_seats: 1,
                    _id: 0
                }
            },
            {
                $unwind: "$booked_seats"
            },
            {
                $replaceRoot: {
                    newRoot: "$booked_seats"
                }
            }
        ])

        return bookedSeats

    },

    getBookingsByUserId: async (userId: string, page: number, limit: number, status: string = "") => {

        const statusCondition = status ? {
            status: status
        } : {}
        const bookings = await Bookings.find({
            user_id: userId,
            ...statusCondition
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()

        return bookings

    },
    
    getBookings: async (page: number, limit: number, status: string = "") => {

        const statusCondition = status? {status: status}: {}
        const bookings = await Bookings.find({
            ...statusCondition
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt: -1})
        .lean()

        return bookings

    },

    getCurrentBookingCountByTheaterId: async (theaterId: string) => {

        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)

        const count = await Bookings.countDocuments({
            theater_id: theaterId,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        })

        return count

    },

    getCurrentBookingsCount: async () => {

        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)

        const count = await Bookings.countDocuments({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        })

        return count

    },

    getTotalBookingsCountByTheaterId: async (theaterId: string) => {

        const totalBookingsCount = await Bookings.countDocuments({
            theater_id: theaterId
        })

        return totalBookingsCount

    },

    getCurrentPriceByTheaterId: async (theaterId: string) => {

        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)

        const totalCurrentPrice = await Bookings.aggregate([
            {
                $match: {
                    theater_id: theaterId,
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: "$price"
                    }
                }
            }
        ])

        return totalCurrentPrice[0].totalPrice

    },

    getBookingsByTheaterId: async (theaterId: string, page: number, limit: number, status: string) => {

        const statusCondition = status ? {
            status: status
        } : {}

        const bookings = await Bookings.find({
            theater_id: theaterId,
            ...statusCondition
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()

        return bookings

    },

    updateBookingById: async (id: string, updatedData: object) => {

        const updatedBooking = await Bookings.findByIdAndUpdate(id, updatedData, { returnDocument: "after" })
        return updatedBooking

    }

}