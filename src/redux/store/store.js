import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./Slices/moviesSlice";
import usersSlice from "./Slices/usersSlice";
import favoritesReducer from "./Slices/favoritesSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice,
    users: usersSlice,
    favorites: favoritesReducer,
  },
});

export default store;
