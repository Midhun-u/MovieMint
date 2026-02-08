import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { TheaterBody } from "../types/theaterBody";
import { validateTheaterRegisterBody } from "../validation/theaterRegisterBody";
import { TheaterModel } from "../models/theater.model";

// Controller for registering theater
export const addTheatereRegisterController = sendErrorResponse(async (context: Context) => {

    const body = await context.req.json() as TheaterBody || {}
    const theaterOwner = context.get("auth")

    // Validating request body
    const validationResult = validateTheaterRegisterBody(body)
    
    if(!validationResult.success || !validationResult.fields){
        context.status(400)
        return context.json({success: false, error: validationResult.error, statusCode: 400})
    }

    // Checking if the owner has theater or not
    const theater = await TheaterModel.getTheaterByOwnerId(theaterOwner.id)
    if(theater) {
        context.status(409)
        return context.json({success: false, error: "Owner is already registered a theater", statusCode: 409})
    }

    const newTheater = await TheaterModel.addTheater({
        ownerId: theaterOwner.id,
        theaterName: validationResult.fields.theaterName,
        theaterLocation: validationResult.fields.theaterLocation,
        formats: validationResult.fields.formats,
        layoutNumber: validationResult.fields.layoutNumber,
        setsNumber: validationResult.fields.setsNumber,
        rowsNumber: validationResult.fields.rowsNumber,
        seatsNumber: validationResult.fields.seatsNumber,
        status: "PENDING",
        allowCancellation: validationResult.fields.allowCancellation
    })    
   
    if(newTheater){
        context.status(201)
        return context.json({success: true, message: "Theater is created", theater: newTheater, statusCode: 201})
    }

    context.status(400)
    return context.json({success: false, error: "Theater couldn't create", statusCode: 400})

}, "addTheaterRequestController error")