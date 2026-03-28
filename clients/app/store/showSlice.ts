import { Show, Shows } from "@/types/show";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    shows: Shows
    show: Show | null
    errorMessage: string
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    shows: [],
    show: null,
    errorMessage: "",
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
            state.show = action.payload?.show ? action.payload.show : null
            if (state.shows.length <= 0 || state.pagination.page === 1 && action.payload.shows) {
                state.shows = action.payload.shows
            } else if (action.payload.shows?.length) {
                state.shows = [...state.shows, ...action.payload.shows]
            }
        },

        clearShowState: (state) => {
            state.loading = false
            state.show = null
            state.shows = []
            state.errorMessage = ""
            state.pagination = {...state.pagination, page: 1}
        },

        incrementPage: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        showFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage || ""
        }

    }
})

export const { showSuccess, showFailed, showRequest, incrementPage, clearShowState } = showSlice.actions
export const showReducer = showSlice.reducer