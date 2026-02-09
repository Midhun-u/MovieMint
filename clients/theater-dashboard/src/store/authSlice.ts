import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    errorMessage: "",
    theaterOwner: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        auth_type: "",
        profile_image: {
            image_url: "",
            id: "",
            user_id: ""
        }
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {

            state.loading = true
            state.theaterOwner = initialState.theaterOwner,
            state.errorMessage = initialState.errorMessage

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