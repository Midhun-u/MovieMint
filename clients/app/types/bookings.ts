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
}