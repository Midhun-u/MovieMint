import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    theater: {},
    errorMessage: ""
}

const theaterSlice = createSlice({
    name: "theater",
    initialState: initialState,
    reducers: {
        
        theaterRequest: (state) => {
            state.loading = true
            state.theater = {}
            state.errorMessage = ""
        },
        theaterSuccess: (state, action) => {
            state.loading = false
            state.theater = action.payload.theater
            state.errorMessage = ""
        },
        theaterFailed: (state, action) => {
            state.loading = false
            state.theater = {}
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const theaterReducer = theaterSlice.reducer
export const {theaterFailed, theaterRequest, theaterSuccess} = theaterSlice.actions