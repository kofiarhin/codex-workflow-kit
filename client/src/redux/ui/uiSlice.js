import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light"
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    }
  }
});

export const { setTheme } = uiSlice.actions;
export default uiSlice.reducer;
