import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    verified: false,
    errorMessage: ""
}

const otpSlice = createSlice({
    name: "otp",
    initialState: initialState,
    reducers: {

        otpRequest: (state) => {
            state.loading = true
            state.verified = false
        },

        otpSuccess: (state) => {
            state.loading = false
            state.verified = true
        },

        otpFailed: (state, action) => {
            state.loading = false
            state.verified = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const {otpFailed, otpRequest, otpSuccess} = otpSlice.actions
export const otpReducer = otpSlice.reducer