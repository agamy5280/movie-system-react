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

export const validateUser = createAsyncThunk("users/login", async (user) => {
  const response = await axios.get("http://localhost:8000/users");

  var flag = false;
  for (const u of response.data) {
    if (u.email === user.email && u.password === user.password) {
      localStorage.setItem("userData", JSON.stringify(u));
      flag = true;
    }
  }
  if (flag) {
    alert("log in succesfully");
    window.location.href = "/";
  } else {
    alert("wrong password or email");
  }
});
export const fetchPrevReservations = createAsyncThunk(
  "users/fetchPrevReservations",
  async (id) => {
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    const result = res.data["past-reservation"];
    return result;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    reservations: [],
    user: null,
    status: "idle",
    error: null,
  },

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
      })
      // ----------------------- Validate User -------------------- //
      .addCase(validateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ----------------------- fetch Prev Reservations -------------------- //
      .addCase(fetchPrevReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrevReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservations = action.payload;
      })
      .addCase(fetchPrevReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
