import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    movie: {},
    errorMessage: ""
}

const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {

        movieRequest: (state) => {
            state.loading = true
            state.movie = {}
            state.errorMessage = ""
        },

        movieSuccess: (state, action) => {
            state.loading = false
            state.movie = action.payload.movie
            state.errorMessage = ""
        },

        movieFailed: (state, action) => {
            state.loading = false
            state.movie = {}
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const movieReducer = movieSlice.reducer
export const {movieFailed, movieRequest, movieSuccess} = movieSlice.actions