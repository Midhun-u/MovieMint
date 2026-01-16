import { addDataToLocalStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading: false,
    errorMessage: "",
    user: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        auth_type: ""
    }

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
            
            if(action.payload.user){
                state.user = action.payload.user
            }else{
                state.user = initialState.user
            }

            if(action.payload.authToken){
                addDataToLocalStorage("authToken", action.payload.authToken)
            }


        },
        authFailed: (state, action) => {

            state.loading = false
            state.errorMessage = action.payload.errorMessage
            state.user = initialState.user

        }

    }
})

export const {authSuccess, authRequest, authFailed} = authSlice.actions
export const authReducer = authSlice.reducer