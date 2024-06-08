import { createSlice } from "@reduxjs/toolkit";

const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: storedFavorites,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.movies.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.movies));
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(state.movies));
    },
    clearFavorite:(state,action)=>{
      state.movies = [];
    }
  },
});

export const { addFavorite, removeFavorite , clearFavorite} = favoritesSlice.actions;

export const selectIsFavorite = (movieId) => (state) => {
  state.favorites.movies.some((favorite) => favorite.id === movieId);
};

export const selectFavorites = (state) => state.favorites.movies;
export default favoritesSlice.reducer;
