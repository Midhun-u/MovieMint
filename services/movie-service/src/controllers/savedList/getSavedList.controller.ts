import { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { convertStringToNumber } from "../../utils/convertStringToNumber";
import { SavedListModel } from "../../models/savedList.model";
import { getMovieImage } from "../../services/getMovieImage";

// Controller for getting saved list
export const getSavedListController = sendErrorResponse(async (context: Context) => {

    const user = context.get("user")
    const { page = 1, limit = 10 } = context.req.query()
    const pageNumber = convertStringToNumber(page)
    const limitNumber = convertStringToNumber(limit)

    const savedList = await SavedListModel.getSavedListByUserId(
        user.id,
        pageNumber,
        limitNumber,
        {
            title: 1,
            certificate: 1,
            categories: 1,
            language: 1,
            status: 1,
            formats: 1,
        }
    )

    const savedListDetails = await Promise.all(savedList.map(async (savedItem) => {

        // Fetching movie image
        const [posterResult] = await Promise.all([
            getMovieImage("poster", savedItem.movie_id._id.toString()),
        ])

        return {
            _id: savedItem._id,
            user_id: savedItem.user_id,
            movie: {
                ...savedItem.movie_id,
                poster: posterResult.success ? posterResult.data : {},
            },
            createdAt: savedItem.createdAt
        }

    }) || [])

    return context.json({ success: true, savedList: savedListDetails.length? savedListDetails: savedList, statusCode: 200 })

}, "getSavedListController error")