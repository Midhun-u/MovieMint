import { createSlice } from "@reduxjs/toolkit";

type SavedItem = {
    _id: string
    user_id: string
    movie_id: string
    movie: {
        title: string
        poster: {
            id: string
            image_url: string
        },
        certificate: string
        language: string
        categories: string
    }
}

type InitialState = {
    loading: boolean
    errorMessage: string
    savedItem: SavedItem | null
    savedList: Array<SavedItem>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    savedItem: null,
    savedList: [],
    pagination: {
        page: 1,
        limit: 1
    }
}


const savedListSlice = createSlice({
    name: "savedList",
    initialState: initialState,
    reducers: {

        savedListRequest: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        savedListSuccess: (state, action) => {
            state.loading = false
            state.savedItem = action.payload?.savedItem? action.payload.savedItem: null
        },

        savedListFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
            state.savedItem = null
        }

    }
})

export const savedListReducer = savedListSlice.reducer
export const {savedListFailed, savedListRequest, savedListSuccess} = savedListSlice.actions