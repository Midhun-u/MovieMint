import { Show } from "../schemas/show.schema"

// Show model
export const ShowModel = {

    addShow: async (data: {
        movieId: string,
        theaterId: string,
        price: number,
        hour: number,
        minutes: number,
        day: number
    }) => {

        const newShow = await Show.create({
            movie_id: data.movieId,
            theater_id: data.theaterId,
            price: data.price,
            hour: data.hour,
            day: data.day,
            status: "SHOWING",
            minutes: data.minutes
        })

        return newShow

    },

    getShowsByTheaterId: async (theaterId: string, page: number, limit: number, status: string = "") => {

        const statusConditon = status ? { status: status } : {}

        const shows = await Show
            .find({
                theater_id: theaterId,
                ...statusConditon
            }, "-booked_seats")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()

        return shows

    },

    getShowsByMovieIdAndTheaterIdWithTime: async (data: {
        movieId: string
        theaterId: string
        day: number
        hour: number
        year: number
        month: number
    }) => {

        const show = await Show.findOne({
            movie_id: data.movieId,
            theater_id: data.theaterId,
            day: data.day,
            hour: data.hour,
            year: data.year,
            month: data.month
        }).lean()

        return show

    },

    getShowById: async (id: string) => {

        const show = await Show.findById(id).lean()
        return show

    },

    updateShowById: async (id: string, updatedBody: object = {}) => {

        const updatedShow = await Show.findByIdAndUpdate(id, updatedBody, { returnDocument: "after" })
        return updatedShow

    },

    getAllTheatersShowsByMovieId: async (condition: object = {}, page: number, limit: number) => {

        const shows = await Show.aggregate([
            {
                $match: condition
            },
            {
                $project: {
                    _id: 1,
                    day: 1,
                    month: 1,
                    movie_id: 1,
                    hour: 1,
                    minutes: 1,
                    price: 1,
                    theater_id: 1,
                }
            },
            {
                $sort: {
                    day: 1,
                    hour: 1,
                    minutes: 1,
                }
            },
            {
                $group: {
                    _id: "$theater_id",
                    shows: {
                        $push: {
                            _id: "$_id",
                            day: "$day",
                            month: "$month",
                            hour: "$hour",
                            minutes: "$minutes",
                            price: "$price"
                        }
                    }
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ])

        return shows

    }

}