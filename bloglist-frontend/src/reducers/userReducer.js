import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    logoutUser(state) {
      state.loggedInUser = null;
    },
    setUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const { logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
