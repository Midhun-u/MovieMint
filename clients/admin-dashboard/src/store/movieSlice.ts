import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    movie: object
    errorMessage: string
    movies: Array<{
        _id: string
        title: string
        language: string
        certificate: string
        categories: Array<string>
        status: "SHOWING" | "NOT_SHOWING" | "PENDING",
        poster: {
            id: string
            image_url: string
        }
    }>
}

const initialState: InitialState = {
    loading: false,
    movie: {},
    errorMessage: "",
    movies: []
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
            state.movies = action.payload.movies || []
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