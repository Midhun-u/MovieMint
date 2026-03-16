import type { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handleError.js";
import type { JWT_PAYLOAD } from "../../types/jwt.js";
import { RateModel } from "../../models/rate.model.js";
import { getUserProfileImage } from "../../service/image/getImage.js";

// Controller for getting rate
export const getRateController = handleError(async (request: FastifyRequest, reply: FastifyReply) => {

    const {movieId} = request.params as {movieId: string}
    const user = request.user as JWT_PAYLOAD

    if(!movieId){
        reply.status(400)
        return {success: false, error: "Movie id is required", statusCode: 400}
    }

    const rate = await RateModel.getRateByMovieIdAndUserId(movieId, user.id)

    // Fetching user image
    const imageResult = await getUserProfileImage(user.id)
    if(imageResult.success){

        const rateWithUserImage = {
            ...rate,    
            profile_image: {
                image_url: imageResult?.data?.userImage?.image_url,
                id: imageResult?.data?.userImage?.id
            }
        }
        
        return {success: true, rate: rateWithUserImage, statusCode: 200}

    }

    return {success: true, rate: rate, statusCode: 200}

}, "getRateController error")