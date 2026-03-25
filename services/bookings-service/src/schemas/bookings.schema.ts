import { model, Schema } from "mongoose";

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
        index: true
    },
    show_id: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED']
    },
    booked_seats: {
        type: Schema.Types.Array,
        required: true,
    },
    booked_time: {
        type: Schema.Types.String,
        required: true
    }
}, {timestamps: true})

export const Bookings = model("Booking", bookingsSchema)