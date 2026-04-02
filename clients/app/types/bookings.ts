export type Bookings = {
    _id: string
    theater_id: string
    movie_id: string
    show_id: string
    status: "COMPLETED" | "CANCELLED",
    booked_seats: Array<{
        layoutNumber: number
        rowNumber: number
        setNumber: number
        seatNumber: number
    }>
    createdAt: string
    movie: {
        _id: string
        title: string
        status: "SHOWING" | "NOT_SHOWING"
        poster: {
            id: string
            image_url: string
        }
        language: string
        categories: Array<string>
        format: Array<string>
        certificate: string
    }
    theater: {
        id: string
        theater_image: {
            id: string
            image_url: string
        }
        theater_name: string
        theater_location: string
    }
    price: number
    show: {
        day: number,
        hour: number,
        minutes: number,
        year: number,
        month: number,
    }
}