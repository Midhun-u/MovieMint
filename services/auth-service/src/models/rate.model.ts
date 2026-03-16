import { Op } from 'sequelize'
import {
    Ratings,
    User
} from '../schemas/index.js'

// Rate model
export const RateModel = {

    addRate: async ({
        userId, 
        rate, 
        comment,
        movieId
    }: {userId: string, rate: number, comment: string, movieId: string}) => {

        const newRate = await Ratings.create({
            rate: rate,
            user_id: userId,
            movie_id: movieId,
            comment: comment.trim() || ""
        })

        return newRate.dataValues

    },

    getRateByMovieIdAndUserId: async (movieId: string, userId: string) => {

        const rate = await Ratings.findOne({
            where: {
                [Op.and]: [{user_id: userId, movie_id: movieId}]
            },
            include: {
                model: User,
                attributes: ["firstname", "lastname", "email"],
            },
            raw: true,
            nest: true
        })

        return rate

    }

}