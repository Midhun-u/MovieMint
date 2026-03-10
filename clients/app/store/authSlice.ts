import { createSlice } from "@reduxjs/toolkit";

type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    auth_type: string,
    profile_image: {
        image_url: string,
        id: string,
        user_id: string
    }
}

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
            state.user = initialState.user

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