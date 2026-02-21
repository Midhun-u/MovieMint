import { Op } from "sequelize";
import { Theater } from "../schemas/theater.schema";
import { TheaterBody } from "../types/theaterBody";

// Theater model
export const TheaterModel = {

    addTheater: async (data: TheaterBody & { ownerId: string } & { status: "PENDING" | "AVAILABLE" }) => {

        const newTheater = await Theater.create({
            owner_id: data.ownerId,
            theater_name: data.theaterName,
            theater_location: data.theaterLocation,
            formats: data.formats,
            layout_number: data.layoutNumber,
            sets_number: data.setsNumber,
            rows_number: data.rowsNumber,
            seats_number: data.seatsNumber,
            allow_cancellation: data.allowCancellation,
            status: data.status
        })

        return newTheater.dataValues

    },

    getTheaterByOwnerId: async (ownerId: string) => {

        const theater = await Theater.findOne({
            where: {
                owner_id: {
                    [Op.eq]: ownerId
                }
            },
        })

        return theater?.dataValues

    },

    getTheaterById: async (theaterId: string) => {

        const theater = await Theater.findByPk(theaterId)
        return theater?.dataValues

    },

    deleteTheaterById: async (theaterId: string) => {

        const deletedCount = await Theater.destroy({
            where: {
                id: {
                    [Op.eq]: theaterId
                }
            }
        })

        return deletedCount

    },

    getTheaterRequests: async (page: number, limit: number, attributes: Array<string> = []) => {

        const attributesCondition = attributes.length ? { attributes: attributes } : {}

        const theaters = await Theater.findAll({
            where: {
                status: {
                    [Op.eq]: "PENDING"
                },
            },
            ...attributesCondition,
            offset: (page - 1) * limit,
            limit: limit,
            order: [["createdAt", "DESC"]],
            raw: true
        })

        return theaters

    },

    updateTheaterById: async (id: string, updateData: object) => {

        const [updatedCount] = await Theater.update(updateData, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return updatedCount

    },

    getPendingTheatersCount: async () => {

        const theatersCount = await Theater.count({
            where: {
                status: {
                    [Op.eq]: "PENDING"
                }
            }
        })

        return theatersCount

    },

    getAvailableTheaterCount: async () => {

        const theatersCount = await Theater.count({
            where: {
                status: {
                    [Op.eq]: "AVAILABLE"
                }
            }
        })

        return theatersCount

    }
}