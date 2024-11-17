import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "registration/registerUser ",
  async ({ username, password }, { rejectWithValue }) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.error || "Registration failed");
    }
    console.log("slice works");

    return "Registration successful!";
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
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
      .addCase(registerUser.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.successMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessages } = registrationSlice.actions;
export default registrationSlice.reducer;
