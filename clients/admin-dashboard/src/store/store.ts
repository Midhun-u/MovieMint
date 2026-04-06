import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { themeReducer } from "./themeSlice";
import { movieReducer } from "./movieSlice";
import { theaterReducer } from "./theaterSlice";
import { bannerReducer } from "./bannerSlice";
import { dashboardReducer } from "./dashboardSlice";
import { bookingsReducer } from "./bookingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    movie: movieReducer,
    theater: theaterReducer,
    banner: bannerReducer,
    dashboard: dashboardReducer,
    bookings: bookingsReducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
