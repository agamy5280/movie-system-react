import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./Slices/moviesSlice";



const store = configureStore({
    reducer:{
        movies: moviesSlice,
    }
})

export default store;