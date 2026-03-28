import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";

// Controller for booking seats
export const bookSeatController = sendErrorResponse(async (context: Context) => {

    const {seats} = await context.req.json() as {seats: Array<{
        layoutNumber: number,
        seatNumber: number,
        rowNumber: number,
        setNumber: number
    }>} || {}

    console.log(seats)

}, "bookSeatController error")