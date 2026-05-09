import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  displayName: null,
  activeOrganizationId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      state.userId = action.payload.userId;
      state.displayName = action.payload.displayName;
      state.activeOrganizationId = action.payload.activeOrganizationId || null;
    },
    clearSession() {
      return initialState;
    }
  }
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
