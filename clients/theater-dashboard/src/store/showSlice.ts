import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    shows: Array<any>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    shows: [],
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
            if(state.shows.length <= 0 || action.payload?.page === 1){
                state.shows = [...action.payload.shows]
            }else{
                state.shows = [...state.shows, ...action.payload.shows]
            }
            state.errorMessage = ""
        },

        incrementPage: (state) => {
            state.pagination = {...state.pagination, page: state.pagination.page + 1}
        },

        showFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        },

        clearState: (state) => {
            state.shows = []
            state.pagination = {page: 1, limit: state.pagination.limit}
            state.errorMessage = ""
            state.loading = false
        }

    }
})

export const showReducer = showSlice.reducer
export const {showRequest, showSuccess, showFailed, incrementPage, clearState} = showSlice.actions