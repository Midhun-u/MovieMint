import { createSlice } from "@reduxjs/toolkit";

type Rate = {
    id: string
    rate: number
    user_id: string
    movie_id: string
    comment: string,
    createdAt: string
}

type InitialState = {
    loading: boolean
    errorMessage: string
    rate: Rate | null,
    ratings: Array<Rate>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    rate: null,
    ratings: [],
    pagination: {
        page: 1,
        limit: 1
    }
}

const rateSlice = createSlice({
    name: 'rate',
    initialState: initialState,
    reducers: {

        rateRequst: (state) => {
            state.loading = true
            state.errorMessage = ""
            state.rate = null
        },

        rateSuccess: (state, action) => {
            state.loading = false
            state.errorMessage = ""
            state.rate = action.payload?.rate? action.payload.rate: null

            if(state.ratings.length || state.pagination.page === 1){
                state.ratings = action.payload?.ratings?.length? action.payload.ratings.length: []
            }else if(action.payload?.ratings?.length){
                state.ratings = [...state.ratings, ...action.payload.ratings]
            }
        },

        increment: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        rateFailed: (state, action) => {
            state.errorMessage = action.payload.errorMessage
            state.loading = false
            state.rate = null
        },

        clearState: (state) => {
            state.ratings = []
            state.rate = null
            state.pagination = {...state.pagination, page: 1}
            state.errorMessage = ""
        }

    }
})

export const {rateFailed, rateRequst, rateSuccess, increment, clearState} = rateSlice.actions
export const rateReducer = rateSlice.reducer