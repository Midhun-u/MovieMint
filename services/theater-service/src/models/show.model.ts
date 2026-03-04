import { Show } from "../schemas/show.schema"

// Show model
export const ShowModel = {

    addShow: async (data: {
        movieId: string,
        theaterId: string,
        price: number,
        hour: number,
        minutes: number,
        startDay: number
    }) => {

        const newShow = await Show.create({
            movie_id: data.movieId,
            theater_id: data.theaterId,
            price: data.price,
            show_time: {
                hour: data.hour,
                minutes: data.minutes,
                start_day: data.startDay
            },
            status: "SHOWING"
        })

        return newShow

    },

    getShowsByTheaterId: async (theaterId: string, page: number, limit: number, status: string = "") => {

        const statusConditon = status? {status: status}: {}

        const shows = await Show
        .find({
            theater_id: theaterId, 
            ...statusConditon
        }, "-booked_seats")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt: -1})
        .lean()

        return shows

    },

    getShowsByMovieIdAndTheaterIdWithTime: async (movieId: string, theaterId: string, startDay: number, hour: number, minutes: number) => {

        const show = await Show.findOne({
            movie_id: movieId,
            theater_id: theaterId,
            "show_time.start_day": startDay,
            "show_time.hour": hour,
            "show_time.minutes": minutes
        })

        return show

    },

    getShowById: async (id: string) => {

        const show = await Show.findById(id).lean()
        return show

    }

}