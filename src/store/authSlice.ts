// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token; // Возвращаем токен для дальнейшего использования
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessages(state) {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.successMessage = "Login successful!";
        state.errorMessage = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.successMessage = "";
      });
  },
});

export const { clearMessages } = authSlice.actions;

export default authSlice.reducer;
