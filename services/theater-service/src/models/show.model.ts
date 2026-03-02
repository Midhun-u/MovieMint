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
            status: "AVAILABLE"
        })

        return newShow

    },

}