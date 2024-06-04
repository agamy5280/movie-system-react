import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getMovies = createAsyncThunk("movies/getAll",async ()=>{
    const result = await axios.get("http://localhost:3000/movies");
    return result.data;
})

const movieSlice = createSlice({
    name:"movies",
    initialState:{movies:[]},
    extraReducers:(builder)=>{
        builder.addCase(
            getMovies.fulfilled,(state,action)=>{
                state.movies = action.payload;
            }
        )
        builder.addCase(
            getMovies.pending,(state,action)=>{
                state.movies = null;
            }
        )
    }
})

export default movieSlice.reducer;