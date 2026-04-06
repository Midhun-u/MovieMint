import type { Admin } from "@/types/admin";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    admin: Admin | null
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    admin: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {
            state.loading = true
            state.admin = null
            state.errorMessage = ''
        },

        authSuccess: (state, action) => {

            state.loading = false
            state.admin = action.payload.admin
            state.errorMessage = initialState.errorMessage

        },

        authFailed: (state, action) => {

            state.loading = false
            state.admin = initialState.admin
            state.errorMessage = action.payload.errorMessage

        }

    }
})

export const authReducer = authSlice.reducer
export const { authRequest, authSuccess, authFailed } = authSlice.actions