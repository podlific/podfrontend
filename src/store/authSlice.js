import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  username: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.username = user;
      user === null ? (state.isAuth = false) : (state.isAuth = true);
    },
  },
});
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
