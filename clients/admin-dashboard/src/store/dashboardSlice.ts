import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean
  errorMessage: string
  pendingMovies: number;
  currentBookings: number;
  totalTheaters: number;
  pendingTheaters: number;
};

const initialState: InitialState = {
  loading: false,
  errorMessage: "",
  pendingMovies: 0,
  pendingTheaters: 0,
  currentBookings: 0,
  totalTheaters: 0
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    
    dashboardRequest: (state) => {
      state.loading = true
    },
    
    dashboardSuccess: (state, action) => {
      state.loading = false
      state.pendingMovies = action.payload.pendingMovies
      state.pendingTheaters = action.payload.pendingTheaters
      state.currentBookings = action.payload.currentBookings
      state.totalTheaters = action.payload.totalTheaters
      
    },
    
    dashboardFailed: (state, action) => {
      state.loading = false
      state.errorMessage = action.payload.errorMessage
    }
    
  },
});

export const dashboardReducer = dashboardSlice.reducer
export const {dashboardFailed, dashboardRequest, dashboardSuccess} = dashboardSlice.actions