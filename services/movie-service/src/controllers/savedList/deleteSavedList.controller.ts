import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { SavedListModel } from "../../models/savedList.model";

// Controller for deleting movie from saved list
export const deleteSavedListController = sendErrorResponse(async (context: Context) => {

    const {id} = context.req.param()
    
    if(!id){
        context.status(400)
        return context.json({success: false, error: "Id is required", statusCode: 400})
    }

    // Checking if movie is exist in saved list
    const savedItem = await SavedListModel.getSavedItemById(id)
    if(!savedItem){
        context.status(404)
        return context.json({success: false, error: "Movie is not found in saved list", statusCode: 404})
    }

    const deletedItem = await SavedListModel.deleteSavedItemById(id)
    if(deletedItem){
        return context.json({success: true, message: "Movie is removed from saved list", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Couldn't remove movie from saved list", statusCode: 400})    

}, "deleteSavedListController error")