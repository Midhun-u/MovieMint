import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    theme: "white" | "dark"
}

// Function for getting theme
const getThemeFromLocalStorage = () => {

    const storedTheme = localStorage.getItem('theme')

    if(storedTheme === "dark" || storedTheme == "white"){
        return storedTheme
    }else{
        return "white"
    }

}

const initialState: InitialState = {
    theme: getThemeFromLocalStorage()
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