import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    theater: {
        id: "",
        theater_name: "",
        theater_location: "",
        formats: [],
        allow_cancellation: null,
        layout_number: 0,
        sets_number: 0,
        rows_number: 0,
        seats_number: 0,
        owner_id: "",
        status: "",
        theater_owner: {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            auth_type: "",
            role: "",
            profile_image: {
                image_id: "",
                image_url: ""
            }
        },
        theater_image: {
            id: "",
            image_url: ""
        },
        createdAt: ""
    },
    errorMessage: ""
}

const theaterSlice = createSlice({
    name: "theater",
    initialState: initialState,
    reducers: {

        theaterRequest: (state) => {
            state.loading = true
            state.theater = initialState.theater
            state.errorMessage = ""
        },
        theaterSuccess: (state, action) => {
            state.loading = false
            state.theater = action.payload.theater || initialState.theater
            state.errorMessage = ""
        },
        theaterFailed: (state, action) => {
            state.loading = false
            state.theater = initialState.theater
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const theaterReducer = theaterSlice.reducer
export const { theaterFailed, theaterRequest, theaterSuccess } = theaterSlice.actions