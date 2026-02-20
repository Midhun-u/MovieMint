import { Schema, model } from "mongoose";

const bannerSchema = new Schema({
    movie_id: {
        type: String,
        required: true
    }
})

export const Banner = model("Banner", bannerSchema)