import { Bookings } from "@/types/bookings";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    bookings: Bookings | null
    userBookings: Array<Bookings>
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    bookings: null,
    userBookings: []
}

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: initialState,
    reducers: {

        bookingsRequest: (state) => {
            state.loading = true
            
        },

        bookingsSuccess: (state, action) => {
            state.loading = false
            state.bookings = action.payload?.bookings? action.payload.bookings: null
        },

        bookingsFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const bookingsReducer = bookingsSlice.reducer
export const {bookingsFailed, bookingsRequest, bookingsSuccess} = bookingsSlice.actions