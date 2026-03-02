import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { themeReducer } from "./themeSlice";
import { theaterReducer } from "./theaterSlice";
import { movieReducer } from "./movieSlice";
import { showReducer } from "./showSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    theater: theaterReducer,
    movie: movieReducer,
    show: showReducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
