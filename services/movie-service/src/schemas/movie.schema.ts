import { model, Schema } from "mongoose";

const movieCertificates = [
    "U",
    "UA7+",
    "UA12+",
    "UA16+",
    "A/18+"
]

const movieCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Thriller",
    "Romance",
    "Horror",
    "Crime",
    "Sci-Fi",
    "Fantasy",
    "Family",
    "Animation",
    "Documentary"
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
    imageId: {
        type: String,
        required: true
    }

}, { _id: false, versionKey: false, timestamps: false })

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    subHeading: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    synopsis: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 250
    },
    posterImageId: {
        type: String,
        required: true
    },
    bannerImageId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true,
        enum: movieCertificates
    },
    category: {
        type: String,
        required: true,
        enum: movieCategories
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: durationSchema,
    actors: actorSchema,
    movieTrailer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["SHOWING", "NOT_SHOWING"]
    }

})

export const Movie = model("Movie", movieSchema)