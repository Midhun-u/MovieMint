import type { TheaterDetails } from "@/types/theater";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    theatersRequests: Array<TheaterDetails>
}

const initialState: InitialState = {
    loading: false,
    theatersRequests: [],
    errorMessage: ""
}

const theaterSlice = createSlice({
    name: "theaterRequests",
    initialState: initialState,
    reducers: {

        theaterRequest: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        theaterSuccess: (state, action) => {
            state.loading = false
            state.theatersRequests = action.payload.theatersRequests || []
            state.errorMessage = ""
        },

        theaterFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const theaterRequestReducer = theaterSlice.reducer
export const { theaterSuccess, theaterFailed, theaterRequest } = theaterSlice.actions