import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("users/getAll", async () => {
  const result = await axios.get("http://localhost:8000/users");
  return result.data;
});
export const getUserByID = createAsyncThunk("users/user", async (id) => {
  const response = await axios.get(`http://localhost:8000/users/${id}`);
  return response.data;
});
export const updateUser = createAsyncThunk(
  "users/profile-edit",
  async ({ id, updatedUser }) => {
    const response = await axios.patch(
      `http://localhost:8000/users/${id}`,
      updatedUser
    );
    return response.data;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    status: "idle",
    error: null,
  },

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

  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.users = null;
      })
      // ----------------------- getUserByID -------------------- //
      .addCase(getUserByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ----------------------- Update User -------------------- //
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { validatUser } = userSlice.actions; // Export the custom reducer action
