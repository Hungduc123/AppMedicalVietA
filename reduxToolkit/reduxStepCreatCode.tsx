import { createSlice } from "@reduxjs/toolkit";

// var data:dataItem
const data = { step: 1, value: "" };
const slice = createSlice({
  name: "reduxStepCreatCode",
  initialState: data,

  reducers: {
    reduxStepCreatCode: (state, action) => {
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});
const { reducer, actions } = slice;
export const { reduxStepCreatCode } = actions;
export default reducer;
