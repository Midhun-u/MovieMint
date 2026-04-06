import type {Bookings} from '../types/bookings'
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    bookings: Array<Bookings>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    bookings: [],
    pagination: {
        page: 1,
        limit: 10
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
            if(state.bookings.length <= 0 || state.pagination.page <= 1){
                state.bookings = action.payload?.bookings? action.payload.bookings: []
            }else if(action.payload?.bookings){
                state.bookings = [...state.bookings, ...action.payload.bookings]
            }
        },

        clearBookingsState: (state) => {
            state.bookings = []
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