import { createSlice } from "@reduxjs/toolkit";
import type { TheaterOwner } from "../types/theaterOwner";

type InitialState = {
    loading: boolean
    errorMessage: string
    theaterOwner: TheaterOwner | null

}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    theaterOwner: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {
            state.loading = true
            state.theaterOwner = null
            state.errorMessage = ""
        },

        authSuccess: (state, action) => {

            state.loading = false
            state.theaterOwner = action.payload.theaterOwner
            state.errorMessage = initialState.errorMessage

        },
        
        authFailed: (state, action) => {

            state.loading = false
            state.theaterOwner = initialState.theaterOwner
            state.errorMessage = action.payload.errorMessage

        }

    }
})

export const authReducer = authSlice.reducer
export const {authRequest, authSuccess, authFailed} = authSlice.actions