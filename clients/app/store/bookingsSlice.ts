import { Bookings } from "@/types/bookings";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    bookings: Bookings | null
    userBookings: Array<Bookings>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    bookings: null,
    userBookings: [],
    pagination: {
        page: 1,
        limit: 1
    }
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
            if(state.userBookings.length <= 0 || state.pagination.page <= 1){
                state.userBookings = action.payload?.userBookings? action.payload.userBookings: []
            }else if(action.payload?.userBookings){
                state.userBookings = [...state.userBookings, ...action.payload.userBookings]
            }
        },

        clearBookingsState: (state) => {
            state.userBookings = []
            state.bookings = null
            state.errorMessage = ""
            state.pagination = {...state.pagination, page: 1}
        },

        incrementPage: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        bookingsFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const bookingsReducer = bookingsSlice.reducer
export const {bookingsFailed, bookingsRequest, bookingsSuccess, incrementPage, clearBookingsState} = bookingsSlice.actions