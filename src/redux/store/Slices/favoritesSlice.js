import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
export const fetchMovieFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (id) => {
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    const result = res.data["movie-favorites"];
    return result;
  }
);

export const addMovieFavorite = createAsyncThunk(
  "favorites/addFavorites",
  async ({ id, movie }) => {
    const userRes = await axios.get(`http://localhost:8000/users/${id}`);
    const currentFavorites = userRes.data["movie-favorites"] || [];
    const updatedFavorites = [...currentFavorites, movie];

    const res = await axios.patch(`http://localhost:8000/users/${id}`, {
      "movie-favorites": updatedFavorites,
    });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return res.data["movie-favorites"];
  }
);

export const removeMovieFavorite = createAsyncThunk(
  "favorites/removeFavorites",
  async ({ id, movieID }) => {
    const userRes = await axios.get(`http://localhost:8000/users/${id}`);
    const currentFavorites = userRes.data["movie-favorites"] || [];
    const updatedFavorites = currentFavorites.filter(
      (movie) => movie.id !== movieID
    );

    const res = await axios.patch(`http://localhost:8000/users/${id}`, {
      "movie-favorites": updatedFavorites,
    });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return res.data["movie-favorites"];
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: storedFavorites,
    status: "idle",
    error: null,
  },
  reducers: {
    clearFavorite: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ----------------------- fetchMovieFavorites -------------------- //
      .addCase(fetchMovieFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovieFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ----------------------- addMovieFavorite -------------------- //
      .addCase(addMovieFavorite.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      // ----------------------- removeMovieFavorite -------------------- //
      .addCase(removeMovieFavorite.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const { clearFavorite } = favoritesSlice.actions;

export const selectIsFavorite = (movieId) => (state) => {
  return state.favorites.movies.some((favorite) => favorite.id === movieId);
};

export const selectFavorites = (state) => state.favorites.movies;

export default favoritesSlice.reducer;
