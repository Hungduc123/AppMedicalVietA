import { createSlice } from "@reduxjs/toolkit";

// var data:dataItem
const data = { fingerprintAuth: false };
const slice = createSlice({
  name: "reduxFingerprint",
  initialState: data,

  reducers: {
    reduxFingerprint: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});
const { reducer, actions } = slice;
export const { reduxFingerprint } = actions;
export default reducer;
