import { createSlice } from "@reduxjs/toolkit";

// var data:dataItem
const data = "";
const slice = createSlice({
  name: "reduxTakePhoto",
  initialState: data,

  reducers: {
    reduxTakePhoto: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});
const { reducer, actions } = slice;
export const { reduxTakePhoto } = actions;
export default reducer;
