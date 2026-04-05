import type { Context } from "hono";
import { BookingsModel } from "../../models/bookings.model.js";

// Controller for getting logs
export const getLogsController = async (context: Context) => {

    const currentBookingsCount = await BookingsModel.getCurrentBookingsCount()

    return context.json({
        success: true, 
        currentBookingsCount: currentBookingsCount,
        statusCode: 200
    })

}