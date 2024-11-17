import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
  },
});

export default store;
