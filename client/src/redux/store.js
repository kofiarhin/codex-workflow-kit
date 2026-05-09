import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import navigationReducer from "./navigation/navigationSlice.js";
import uiReducer from "./ui/uiSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
    ui: uiReducer
  }
});
