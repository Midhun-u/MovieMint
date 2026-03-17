import { MovieData } from "@/types/movie";
import { createSlice } from "@reduxjs/toolkit";

type MovieList = Array<Pick<MovieData, "_id" | "poster" | "title" | "categories" | "language" | "certificate" | "status">>

type InitialState = {
  loading: boolean;
  movie: MovieData | null;
  errorMessage: string;
  movies: MovieList;
  pagination: {
    page: number;
    limit: number;
  };
};

const initialState: InitialState = {
  loading: false,
  movie: null,
  errorMessage: "",
  movies: [],
  pagination: {
    page: 1,
    limit: 10,
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    movieRequest: (state) => {
      state.loading = true;
      state.movie = null;
      state.errorMessage = "";
    },

    movieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload?.movie ? action.payload.movie : null;
      if (state.movies?.length <= 0 || state.pagination.page === 1) {
        state.movies = action.payload.movies?.length? action.payload.movies: [];
      } else {
        state.movies = [...state.movies, ...action.payload.movies];
      }
      state.errorMessage = "";
    },

    movieFailed: (state, action) => {
      state.loading = false;
      state.movie = null;
      state.errorMessage = action.payload.errorMessage;
    },

    incrementPage: (state) => {
      state.pagination = { ...state.pagination, page: state.pagination.page + 1 }
    },

    clearState: (state) => {
      state.loading = false;
      state.movie = null;
      state.movies = [];
      state.pagination = { ...state.pagination, page: 1 }
    },
  },
});

export const movieReducer = movieSlice.reducer;
export const {
  movieFailed,
  movieRequest,
  movieSuccess,
  clearState,
  incrementPage,
} = movieSlice.actions;
