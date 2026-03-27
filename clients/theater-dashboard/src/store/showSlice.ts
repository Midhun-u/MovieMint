import { createSlice } from "@reduxjs/toolkit";
import type { Show } from "../types/show";

type InitialState = {
    loading: boolean
    errorMessage: string
    shows: Array<Show>
    show: Show | null
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    shows: [],
    show: null,
    pagination: {
        page: 1,
        limit: 10
    }
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
            state.show = action.payload?.show? action.payload.show: null
            if (state.shows.length <= 0 || state.pagination.page === 1) {
                state.shows = action.payload?.shows? [...action.payload.shows]: []
            } else if(action.payload?.shows?.length){
                state.shows = [...state.shows, ...action.payload.shows]
            }
            state.errorMessage = ""
        },

        incrementPage: (state) => {
            state.pagination = { ...state.pagination, page: state.pagination.page + 1 }
        },

        showFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        },

        clearState: (state) => {
            state.shows = []
            state.pagination = { page: 1, limit: state.pagination.limit }
            state.errorMessage = ""
            state.loading = false
        }

    }
})

export const showReducer = showSlice.reducer
export const { showRequest, showSuccess, showFailed, incrementPage, clearState } = showSlice.actions