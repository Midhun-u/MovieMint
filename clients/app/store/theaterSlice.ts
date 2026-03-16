import { TheaterDetails } from "@/types/theater"
import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    loading: boolean
    theater: TheaterDetails | null
    errorMessage: string
}

const initialState: InitialState = {
    loading: false,
    theater: null,
    errorMessage: ""
}

const theaterSlice = createSlice({
    name: "theater",
    initialState: initialState,
    reducers: {
        
        theaterRequest: (state) => {
            state.loading = true
            state.theater = null
            state.errorMessage = ""
        },
        theaterSuccess: (state, action) => {
            state.loading = false
            state.theater = action.payload.theater || initialState.theater
            state.errorMessage = ""
        },
        theaterFailed: (state, action) => {
            state.loading = false
            state.theater = null
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const theaterReducer = theaterSlice.reducer
export const {theaterFailed, theaterRequest, theaterSuccess} = theaterSlice.actions