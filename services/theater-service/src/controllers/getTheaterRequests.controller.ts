import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { TheaterModel } from "../models/theater.model";
import { getUser } from "../services/getUser";
import { getTheaterImage } from "../services/getTheaterImage";

// Controller for getting all theater request
export const getTheaterRequestsController = sendErrorResponse(async (context: Context) => {

    const { page = 1, limit = 10} = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const { rows: theaters, count: totalCount } = await TheaterModel.getTheaterRequests(
        pageNumber,
        limitNumber,
        [
            "id",
            "theater_name",
            "theater_location",
            "layout_number",
            "sets_number",
            "seats_number",
            "rows_number",
            "status",
            "owner_id",
            "createdAt"
        ],
    )

    const theatersDetails = await Promise.all(theaters.map(async (theater: any) => {

        // Fetching theater owner and theater image
        const [authResult, imageResult] = await Promise.all([
            getUser(theater.owner_id),
            getTheaterImage(theater.id)
        ])
        
        if(authResult.success && imageResult.success){
            return {
                ...theater,
                theater_owner: authResult.user,
                theater_image: {
                    id: imageResult.data.id,
                    image_url: imageResult.data.image_url
                }
            }
        }

    }) || [])

    return context.json({ 
        success: true, 
        theaters: theatersDetails.length? theatersDetails: theaters, 
        totalCount: totalCount, 
        statusCode: 200 
    })

}, "getTheaterRequestController")