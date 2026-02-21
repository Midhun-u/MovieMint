import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { MovieModel } from "../models/movie.model";

// Controller for getting dashboard logs
export const getDashboardLogsController = sendErrorResponse(async (context: Context) => {

    const pendingMoviesCount = await MovieModel.getPendingMoviesCount()

    return context.json({
        success: true,
        pendingMoviesCount: pendingMoviesCount,
        statusCode: 200
    })

}, "getDashboardLogsController error")