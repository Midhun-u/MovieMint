import { createSlice } from "@reduxjs/toolkit";

type Rate = {
    id: string
    rate: number
    user_id: string
    movie_id: string
    comment: string,
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
        },

        rateFailed: (state, action) => {
            state.errorMessage = action.payload.errorMessage
            state.loading = false
            state.rate = null
        }

    }
})

export const {rateFailed, rateRequst, rateSuccess} = rateSlice.actions
export const rateReducer = rateSlice.reducer