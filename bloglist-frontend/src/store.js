import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
  },
});
