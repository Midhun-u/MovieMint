import { Schema } from "mongoose";

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
    certificate: {
        type: String,
        required: true,
    }
})