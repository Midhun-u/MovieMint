import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    theme: "white" | "dark"
}

const initialState: InitialState = {
    theme:  "white"
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {

        switchTheme: (state) => {

            if(state.theme === "dark"){

                state.theme = "white" 
                localStorage.setItem("theme", "white")

            }else{

                state.theme = "dark"
                localStorage.setItem("theme", "dark")

            }

        }

    }
})

export const {switchTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer