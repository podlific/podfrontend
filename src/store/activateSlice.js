import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usertype: "",
  username: "",
  unique_id: "",
};
export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.usertype = action.payload;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setUniqueID: (state, action) => {
      state.unique_id = action.payload;
    },
  },
});
export const { setUserName, setUserType, setUniqueID } = activateSlice.actions;

export default activateSlice.reducer;
