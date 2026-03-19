import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwt.js";
import { convertStringToNumber } from "../../utils/convertStringToNumber.js";
import { RateModel } from "../../models/rate.model.js";
import { getUserProfileImage } from "../../service/image/getImage.js";

// Controller for getting rates
export const getRatingsController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const user = request.user as JWT_PAYLOAD
    const { page = 1, limit = 10 } = request.query as { page: string | number, limit: string | number }
    const { movieId } = request.params as { movieId: string }
    const pageNumber = convertStringToNumber(page, true)
    const limitNumber = convertStringToNumber(limit, true)

    if (!movieId) {
        reply.status(400)
        return { success: false, error: "Movie id is required", statusCode: 400 }
    }

    const ratings = await RateModel.getRatesByMovieId(movieId, user.id, pageNumber, limitNumber)

    // Fetching users images
    const ratingsWithUsersImages = await Promise.all(ratings.map(async (rate: any) => {

        const imageResult = await getUserProfileImage(rate.user_id)
        if (imageResult.success) {
            return {
                ...rate,
                profile_image: {
                    image_url: imageResult?.data?.userImage?.image_url,
                    id: imageResult?.data?.userImage?.id
                }
            }
        }

    }) || [])

    return {
        success: true,
        ratings: ratingsWithUsersImages.length ? ratingsWithUsersImages : ratings,
        statusCode: 200
    }
}, "getRatingsController error")