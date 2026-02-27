import { createSlice } from "@reduxjs/toolkit";

type Movie = {
  _id: string;
  title: string;
  language: string;
  certificate: string;
  categories: Array<string>;
  status: "SHOWING" | "NOT_SHOWING" | "PENDING";
  poster: {
    id: string;
    image_url: string;
  };
}

type InitialState = {
  loading: boolean;
  movie: Movie | null
  errorMessage: string;
  movies: Movie[]
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
    limit: 1,
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
      if (state.movies.length <= 0 || action.payload?.page === 1) {
        state.movies = action.payload.movies;
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
      state.pagination.page = state.pagination.page + 1;
    },

    clearState: (state) => {
      state.loading = false;
      state.movie = null;
      state.movies = [];
      state.pagination = { page: 1, limit: state.pagination.limit }
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
