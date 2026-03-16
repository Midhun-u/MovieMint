import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { SavedListModel } from "../../models/savedList.model";

// Controller for adding movie to saved list
export const addSavedListController = sendErrorResponse(async (context: Context) => {

     const { movieId } = await context.req.json()
     const user = context.get("user")

     if (!movieId) {
          context.status(400)
          return context.json({ success: false, error: "Movie id is required", statusCode: 400 })
     }

     // Checking if movie is already exist in saved list
     const savedItem = await SavedListModel.getSavedItemByMovieIdAndUserId(movieId, user.id)
     console.log(savedItem)
     if (savedItem) {
          context.status(409)
          return context.json({ success: false, error: "Movie is already added to saved list", statusCode: 409 })
     }

     const newSavedItem = await SavedListModel.addMovie(movieId, user.id)
     if (newSavedItem) {
          context.status(201)
          return context.json({ success: true, message: "Movie is added to saved list", newSavedItem: newSavedItem, statusCode: 201 })
     }

     context.status(400)
     return context.json({ success: false, error: "Couldn't add movie to saved list", statusCode: 400 })

}, "addSavedListController error")