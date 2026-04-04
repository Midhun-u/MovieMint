import type { Context } from "hono";
import { BookingsModel } from "../../models/bookings.model.js";
import { getTheaterByOwner } from "../../services/getTheaterByTheaterOwner.js";

// Controller for getting logs
export const getLogsController = async (context: Context) => {

    const authToken = context.req.header("Authorization")

    const theaterResult = await getTheaterByOwner(authToken as string)
    if (!theaterResult?.success || !theaterResult?.theater) {
        context.status(502)
        return context.json({ success: false, error: "Couldn't get the theater details", statusCode: 502 })
    }


    const [
        currentBookingsCount,
        totalBookingsCount,
        totalCurrentPrice
    ] = await Promise.all([
        BookingsModel.getCurrentBookingCountByTheaterId(theaterResult.theater?.id),
        BookingsModel.getTotalBookingsCountByTheaterId(theaterResult.theater?.id),
        BookingsModel.getCurrentPriceByTheaterId(theaterResult.theater?.id)
    ])
    return context.json({
        success: true,
        currentBookingsCount: currentBookingsCount,
        totalBookingsCount: totalBookingsCount,
        totalCurrentPrice: totalCurrentPrice,
        statusCode: 200
    })

}