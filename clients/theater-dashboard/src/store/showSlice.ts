import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    shows: Array<any>
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    shows: [],
}

const showSlice = createSlice({
    name: "show",
    initialState: initialState,
    reducers: {
        
        showRequest: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        showSuccess: (state, action) => {
            state.loading = false
            state.shows = action.payload?.shows
            state.errorMessage = ""
        },

        showFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const showReducer = showSlice.reducer
export const {showRequest, showSuccess, showFailed} = showSlice.actions