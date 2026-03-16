import { Context } from "hono"
import { sendErrorResponse } from "../../utils/sendErrorResponse"
import { SavedListModel } from "../../models/savedList.model"

// Controller getting movie from saved list
export const getSavedItemController = sendErrorResponse(async (context: Context) => {

    const user = context.get("user")
    const {movieId} = context.req.param()

    const savedItem = await SavedListModel.getSavedItemByMovieIdAndUserId(movieId, user.id)
    return context.json({success: true, savedItem: savedItem, statusCode: 200})

}, "getSavedItemController error")