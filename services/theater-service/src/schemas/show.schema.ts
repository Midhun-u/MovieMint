import { model, Schema } from "mongoose";

const showSchema = new Schema({
    theater_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    movie_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    booked_seats: {
        type: Schema.Types.Array,
        default: [],
        required: true,
    },
    year: {
        type: Schema.Types.Number,
        required: true,
        default: new Date().getFullYear(),
    },
    month: {
        type: Schema.Types.Number,
        required: true,
        default: new Date().getMonth(),
    },
    day: {
        type: Schema.Types.Number,
        required: true,
    },
    hour: {
        type: Schema.Types.Number,
        required: true
    },
    minutes: {
        type: Schema.Types.Number,
        required: true
    },
    status: {
        type: Schema.Types.String,
        enum: ["SHOWING", "NOT_SHOWING"],
        default: "AVAILABLE",
        required: true
    }
}, { timestamps: true })

export const Show = model("Show", showSchema)