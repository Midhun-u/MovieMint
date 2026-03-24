import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TheaterModel } from "../../models/theater.model";

// Controller for deleting theater registration
export const deleteTheaterRegistrationController = sendErrorResponse(async (context: Context) => {

    const {theaterId} = context.req.param()
    
    if(!theaterId){
        context.status(400)
        return context.json({success: false, error: "Theater id is missing", statusCode: 400})
    }

    // Checking if theater exists or not
    const theater = await TheaterModel.getTheaterById(theaterId)
    if(!theater){
        context.status(404)
        return context.json({success: false, error: "Theater is not found", statusCode: 404})
    }

    const deletedCount = await TheaterModel.deleteTheaterById(theater.id)
    if(deletedCount){
        context.status(200)
        return context.json({success: true, message: "Theater is deleted", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Theater couldn't delete", statusCode: 400})

}, "deleteTheaterRegistrationController")