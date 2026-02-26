import type { Theater } from "../types/theater";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
  errorMessage: string;
  theaters: Array<Theater>;
  pagination: {
    page: number
    limit: number
  }
};

const initialState: InitialState = {
  loading: false,
  theaters: [],
  errorMessage: "",
  pagination: {
    page: 1,
    limit: 1
  }
};

const theaterSlice = createSlice({
  name: "theater",
  initialState: initialState,
  reducers: {
    theaterRequest: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },

    theaterSuccess: (state, action) => {
      state.loading = false;
      if (state.theaters.length <= 0 || action.payload.page === 1) {
        state.theaters = action.payload.theaters
      } else if (action.payload.theaters.length && !action.payload?.filter) {
        state.theaters = [
          ...state.theaters,
          ...action.payload.theaters
        ]
      } else if(action.payload.filter){
        state.theaters = action.payload.theaters
      }
      state.errorMessage = "";
    },

    theaterFailed: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    
    incrementPage: (state) => {
      state.pagination.page = state.pagination.page + 1
    },
    
    clearState: (state) => {
      state.errorMessage = ""
      state.loading = false
      state.theaters = []
      state.pagination = {page: 1, limit: state.pagination.limit}
    }
  },
});

export const theaterReducer = theaterSlice.reducer;
export const { theaterSuccess, theaterFailed, theaterRequest , clearState, incrementPage} =
  theaterSlice.actions;
