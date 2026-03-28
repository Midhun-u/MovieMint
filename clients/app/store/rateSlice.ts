import { createSlice } from "@reduxjs/toolkit";

type Rate = {
    id: string
    rate: number
    user_id: string
    movie_id: string
    comment: string,
    createdAt: string,
    user: {
        firstname: string
        lastname: string
    }
    profile_image: {
        id: string
        image_url: string
    }
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
        limit: 10
    }
}

const rateSlice = createSlice({
    name: 'rate',
    initialState: initialState,
    reducers: {

        rateRequst: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        rateSuccess: (state, action) => {
            state.loading = false
            state.errorMessage = ""
            if (action.payload?.rate) {
                state.rate = action.payload.rate
            }else{
                state.rate = null
            }

            if (state.ratings.length <= 0 || state.pagination.page === 1 && action.payload?.ratings) {
                state.ratings = action.payload.ratings?.length ? action.payload.ratings : []
            } else if (action.payload.ratings?.length) {
                state.ratings = [...state.ratings, ...action.payload.ratings]
            }
        },

        incrementPage: (state) => {
            state.pagination = { ...state.pagination, page: state.pagination.page + 1 }
        },

        rateFailed: (state, action) => {
            state.errorMessage = action.payload.errorMessage
            state.loading = false
            state.rate = null
        },

        clearState: (state) => {
            state.ratings = []
            state.rate = null
            state.pagination = { ...state.pagination, page: 1 }
            state.errorMessage = ""
        }

    }
})

export const { rateFailed, rateRequst, rateSuccess, incrementPage, clearState } = rateSlice.actions
export const rateReducer = rateSlice.reducer