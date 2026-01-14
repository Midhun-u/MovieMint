import { addDataToLocalStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

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
            state.user = null

        },
        authSuccess: (state, action) => {
            
            state.loading = false
            state.errorMessage = ""
            state.user = action.payload.user
            
            if(action.payload.authToken){
                addDataToLocalStorage("authToken", action.payload.authToken)
            }

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