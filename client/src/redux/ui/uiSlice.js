import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    theme: getInitialTheme(),
    notification: null
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    showToast: {
      reducer(state, action) {
        state.notification = action.payload;
      },
      prepare({ message, type = "success" }) {
        return {
          payload: {
            id: nanoid(),
            message,
            type
          }
        };
      }
    },
    dismissToast(state, action) {
      if (!action.payload || state.notification?.id === action.payload) {
        state.notification = null;
      }
    }
  }
});

export const { dismissToast, setTheme, showToast, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
