import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading: false,
    errorMessage: null,
    user: null

}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {
            
            state.loading = true
            state.errorMessage = null
            state.user = null

        },
        authSuccess: (state, action) => {

            state.loading = false
            state.errorMessage = null
            state.user = action.payload.user

        },
        authFailed: (state, action) => {

            state.loading = false
            state.errorMessage = action.payload.errorMessage
            state.user = null

        }

    }
})

export const {authSuccess, authRequest, authFailed} = authSlice.actions
export const authReducer = authSlice.reducer