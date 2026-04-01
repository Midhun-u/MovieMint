import type { SeatType } from "./seatType.js"

export type BookingsBody = {
    showId: string
    theaterId: string
    bookedSeats: Array<SeatType>
    movieId: string
    price: number
}