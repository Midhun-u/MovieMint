import { Schema, model } from "mongoose";

const bannerSchema = new Schema({
    movie_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        unique: true,
        ref: "Movie"
    }
}, {timestamps: true})

export const Banner = model("Banner", bannerSchema)