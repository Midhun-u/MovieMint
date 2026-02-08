import { model, Schema } from "mongoose";

const movieCertificates = [
    "U",
    "UA7+",
    "UA12+",
    "UA16+",
    "A/18+"
]

const durationSchema = new Schema({

    hour: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    }

}, {_id: false, versionKey: false, timestamps: false})

const actorSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }

}, {_id: false, versionKey: false, timestamps: false })

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    sub_heading: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
        trim: true
    },
    synopsis: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 350,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    certificate: {
        type: String,
        required: true,
        enum: movieCertificates,
        trim: true
    },
    categories: [{
        type: String,
        required: true
    }],
    formats: [{
        type: String,
        required: true
    }],
    release_date: {
        type: Date,
        required: true
    },
    duration: durationSchema,
    actors: [actorSchema],
    movie_trailer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["SHOWING", "NOT_SHOWING", "PENDING"],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["LIVE_ACTION", "ANIMATED"],
        trim: true
    }

})

export const Movie = model("Movie", movieSchema)