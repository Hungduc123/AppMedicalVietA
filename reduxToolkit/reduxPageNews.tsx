import { createSlice } from "@reduxjs/toolkit";

const data = 0;
const slice = createSlice({
  name: "reduxPageNews",
  initialState: data,

  reducers: {
    reduxPageNews: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});
const { reducer, actions } = slice;
export const { reduxPageNews } = actions;
export default reducer;
