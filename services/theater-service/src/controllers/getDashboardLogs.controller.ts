import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { TheaterModel } from "../models/theater.model";

// Controller for getting dashboard logs
export const getDashboardLogsController = sendErrorResponse(async (context: Context) => {

    const [pendingTheatersCount, availableTheatersCount] = await Promise.all([
        TheaterModel.getPendingTheatersCount(),
        TheaterModel.getAvailableTheaterCount()
    ])
    return context.json({
        success: true,
        pendingTheatersCount: pendingTheatersCount,
        availableTheatersCount: availableTheatersCount
    })

}, "getDashboardLogsController error")