import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { themeReducer } from "./themeSlice";
import { movieReducer } from "./movieSlice";
import { theaterRequestReducer } from "./theatersRequestSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        movie: movieReducer,
        theaterRequestReducer: theaterRequestReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']