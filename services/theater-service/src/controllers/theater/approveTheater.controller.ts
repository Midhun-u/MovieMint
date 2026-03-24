import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TheaterModel } from "../../models/theater.model";
import { getUser } from "../../services/getUser";
import { sendApprovalEmail } from "../../utils/sendApprovalEmail";

// Controller for approving theater
export const approveTheaterController = sendErrorResponse(async (context: Context) => {

    const {theaterId} = context.req.param()
   
    if(!theaterId){
        context.status(400)
        return context.json({success: false, error: "Theater id is required", statusCode: 400})
    }

    // Checking if theater request exists
    const theaterRequest = await TheaterModel.getTheaterById(theaterId)
    
    if(!theaterRequest){
        context.status(404)
        return context.json({success: false, error: "Theater request is not found", statusCode: 404})
    }

    const updatedCount = await TheaterModel.updateTheaterById(theaterId, { status: "AVAILABLE"})
    if(updatedCount){

        // Fetching theater owner
        const authResult = await getUser(theaterRequest.owner_id)
        if(authResult.success && authResult.user){

            // Sending email to theater owner
            await sendApprovalEmail(authResult.user.email)

        }

        context.status(200)
        return context.json({success: true, message: "Theater request is approved", statusCode: 200})
    }

    context.status(400)
    return context.json({success: false, error: "Couldn't approve the theater", statusCode: 400})

}, "approveTheaterController error")