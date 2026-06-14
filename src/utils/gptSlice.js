import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    isLoading: false,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },

    setGptSearchView: (state, action) => {
      state.showGptSearch = action.payload;
    },

    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isLoading = false;
    },

    setGptLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default gptSlice.reducer;
export const {
  toggleGptSearchView,
  setGptSearchView,
  addGptMovieResult,
  setGptLoading,
} = gptSlice.actions;
