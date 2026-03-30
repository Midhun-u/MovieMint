import { model, Schema } from "mongoose";

// Booked seats schema
const BookedSeatsSchema = new Schema({
    layoutNumber: {
        required: true,
        type: Schema.Types.Number
    },
    rowNumber: {
        required: true,
        type: Schema.Types.Number
    },
    seatNumber: {
        required: true,
        type: Schema.Types.Number
    },
    setNumber: {
        required: true,
        type: Schema.Types.Number
    }
}, {_id: false})

// Bookings schema
export const bookingsSchema = new Schema({
    theater_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    user_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    movie_id: {
        type: Schema.Types.String,
        required: true,
    },
    show_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    status: {
        type: Schema.Types.String,
        enum: ['COMPLETED', 'CANCELLED']
    },
    booked_seats: [BookedSeatsSchema],
}, {timestamps: true})

export const Bookings = model("Booking", bookingsSchema)