import type { MovieData } from "../types/movie";
import { createSlice } from "@reduxjs/toolkit";

type Banner = {
  _id: string;
  movie: MovieData;
  createdAt: string;
};

type InitialState = {
  loading: boolean;
  banner: Banner | null;
  banners: Banner[];
  errorMessage: string;
};

const initialState: InitialState = {
  loading: false,
  banner: null,
  banners: [],
  errorMessage: "",
};

const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {
    bannerRequest: (state) => {
      state.loading = true;
    },

    bannerSuccess: (state, action) => {
      state.loading = false;
      state.banner = action.payload.banner;
      if (action.payload.banners?.length) {
        state.banners = action.payload.banners;
      }
    },

    bannerFailed: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },

    clearState: (state) => {
      state.loading = false
      state.banner = null
      state.banners = []
      state.errorMessage = ""
    }
  },
});

export const { bannerSuccess, bannerFailed, bannerRequest, clearState } =
  bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
