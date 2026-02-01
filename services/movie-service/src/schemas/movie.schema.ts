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

}, {versionKey: false, timestamps: false })

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    subHeading: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true
    },
    synopsis: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 250,
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
    releaseDate: {
        type: Date,
        required: true
    },
    duration: durationSchema,
    actors: [actorSchema],
    movieTrailer: {
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