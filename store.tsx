import { configureStore } from "@reduxjs/toolkit";

import reduxLoginReducer from "./reduxToolkit/reduxLogin";
import reduxStepCreatCodeReducer from "./reduxToolkit/reduxStepCreatCode";
import reduxFingerprintReducer from "./reduxToolkit/reduxFingerprint";
import reduxPageNewsReducer from "./reduxToolkit/reduxPageNews";
import reduxTakePhotoReducer from "./reduxToolkit/reduxTakePhoto";

const rootReducer = {
  reduxLogin: reduxLoginReducer,
  reduxStepCreatCode: reduxStepCreatCodeReducer,
  reduxFingerprint: reduxFingerprintReducer,
  reduxPageNews: reduxPageNewsReducer,
  reduxTakePhoto: reduxTakePhotoReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
