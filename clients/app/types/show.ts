export type Show = {
    _id: string
    shows: Array<{
        price: number
        show_time: {
            start_day: number
            hour: number
            minutes: number
            year: number
            month: number
        }
        status: "SHOWING"
    }>
    theater_image: {
        id: string
        image_url: string
    }
}