import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    errorMessage: "",
    admin: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        auth_type: "",
        profileImage: {
            imageUrl: "",
            imageType: "",
            imageId: ""
        }
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {

            state.loading = true
            state.admin = initialState.admin,
            state.errorMessage = initialState.errorMessage

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
export const {authRequest, authSuccess, authFailed} = authSlice.actions