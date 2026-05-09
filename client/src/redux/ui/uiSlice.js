import { createSlice } from "@reduxjs/toolkit";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  if (typeof window.matchMedia !== "function") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: getInitialTheme()
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    }
  }
});

export const { setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
