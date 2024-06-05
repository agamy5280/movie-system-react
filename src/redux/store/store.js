import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./Slices/moviesSlice";
import usersSlice from "./Slices/usersSlice";



const store = configureStore({
    reducer:{
        movies: moviesSlice,
        users : usersSlice,
    }
})

export default store;