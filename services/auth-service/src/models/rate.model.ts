import { Op, Sequelize } from 'sequelize'
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

    },

    getRateById: async (id: string) => {

        const rate = await Ratings.findByPk(id)
        return rate?.dataValues

    },

    deleteRateById: async (id: string) => {

        const deletedCount = await Ratings.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return deletedCount

    },

    getRateDetailsByMovieId: async (movieId: string) => {

        const rateDetails = await Ratings.findOne({
            attributes: [
                [Sequelize.fn(`COUNT`, Sequelize.col('id')), "totalRatings"],
                [Sequelize.fn('AVG', Sequelize.col('rate')), "averageRatings"]
            ],
            where: {
                movie_id: {
                    [Op.eq]: movieId
                }
            }
        })
        
        return rateDetails?.dataValues

    },

    updateRateById: async (id: string, updatedData: object) => {

        const [updatedCount] = await Ratings.update(updatedData, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return updatedCount

    },

    getRatesByMovieId: async (movieId: string, userId: string, page: number, limit: number) => {

        const rates = await Ratings.findAll({
            where: {
                movie_id: {
                    [Op.eq]: movieId
                },
                
            },
            include: {
                model: User,
                attributes: ["firstname", "lastname", "email"]
            },
            raw: true,
            nest: true,
            offset: (page - 1) * limit,
            limit: limit
        })

        return rates

    }

}