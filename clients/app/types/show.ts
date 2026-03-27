export type Show = {
    _id: string
    shows: Array<{
        _id: string
        price: number
        day: number
        hour: number
        minutes: number
        year: number
        month: number
        status: "SHOWING"
    }>
    theater_location: string
    theater_name: string
    theater_image: {
        id: string
        image_url: string
        theater_id: string
    }
    allow_cancellation: boolean
}