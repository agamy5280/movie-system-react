import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("movies/getAll", async () => {
  const result = await axios.get("http://localhost:8000/movies");
  return result.data;
});
export const getMovieByID = createAsyncThunk("movies/movie", async (id) => {
  const response = await axios.get(`http://localhost:8000/movies/${id}`);
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movie: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(getMovies.pending, (state, action) => {
        state.movies = null;
      })
      // ----------------------- Get Movie By ID -------------------- //
      .addCase(getMovieByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovieByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(getMovieByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
