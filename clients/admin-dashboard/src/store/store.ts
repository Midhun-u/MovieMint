import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { themeReducer } from "./themeSlice";
import { movieReducer } from "./movieSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        movie: movieReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']