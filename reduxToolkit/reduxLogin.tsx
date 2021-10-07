import { createSlice } from "@reduxjs/toolkit";

// var data:dataItem
const data = { isSigning: false };
const slice = createSlice({
  name: "reduxLogin",
  initialState: data,

  reducers: {
    reduxLogin: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});
const { reducer, actions } = slice;
export const { reduxLogin } = actions;
export default reducer;
