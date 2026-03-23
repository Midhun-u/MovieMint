import { model, Schema } from "mongoose";

const savedListSchema = new Schema({
    user_id: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "Movie"
    }
}, { timestamps: true })

export const SavedList = model("Saved_List", savedListSchema)