import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getUsers = createAsyncThunk("users/getAll",async ()=>{
    const result = await axios.get("http://localhost:3000/users");
    return result.data;
})

const userSlice = createSlice({
    name:"users",
    initialState:{users:[]},

    
    // reducers:{
    //     async validatUser(state, action) {
    //     getUsers();
    //      for (const u of state.users){
    //         console.log(action.payload.email);
    //         if (u.email==action.payload.email && u.password==action.payload.password){
    //         alert("log in succesfully")
    //     }

    //     }
      

    //     }
    // },
   
    extraReducers:(builder)=>{
        builder.addCase(
            getUsers.fulfilled,(state,action)=>{
                state.users = action.payload;
            }
        )
        builder.addCase(
            getUsers.pending,(state,action)=>{
                state.users = null;
            }
        )
    }
})

export default  userSlice.reducer;
export const { validatUser } = userSlice.actions; // Export the custom reducer action
