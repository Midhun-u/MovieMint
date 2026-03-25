import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { validateShowBody } from "../../validation/showBody";
import { ShowModel } from "../../models/show.model";

// controller for adding show
export const addShowController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json()
    
    // Validating body
    const validateBody = validateShowBody(body)
    if(!validateBody.success || !validateBody.fields){
        context.status(400)
        return context.json({success: false, error: "Invalid fields", statusCode: 400})
    }

    // Checking if show already exists
    const show = await ShowModel.getShowsByMovieIdAndTheaterIdWithTime({
        movieId: validateBody.fields.movieId,
        theaterId: validateBody.fields.theaterId,
        day: validateBody.fields.day,
        hour: validateBody.fields.hour,
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    
    if(show){
        context.status(409)
        return context.json({success: false, error: "Show is already exists", statusCode: 409})
    }

    const newShow = await ShowModel.addShow(validateBody.fields)
    if(!newShow){
        context.status(400)
        return context.json({success: false, error: "Could't add the show", statusCode: 400})
    }

    return context.json({success: true, message: "Show is created", show: newShow, statusCode: 200})

}, "addShowController error")