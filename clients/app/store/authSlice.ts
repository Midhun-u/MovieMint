import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    user: User | null
}

const initialState: InitialState = {

    loading: false,
    errorMessage: "",
    user: null

}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {

            state.loading = true
            state.errorMessage = ""

        },
        authSuccess: (state, action) => {

            state.loading = false
            state.errorMessage = ""

            if (action.payload.user) {
                state.user = action.payload.user
            } else {
                state.user = initialState.user
            }

            if (action.payload.authToken) {
                localStorage.setItem("authToken", action.payload.authToken)
            }


        },
        authFailed: (state, action) => {

            state.loading = false
            state.errorMessage = action.payload.errorMessage
            state.user = initialState.user

        }

    }
})

export const { authSuccess, authRequest, authFailed } = authSlice.actions
export const authReducer = authSlice.reducer