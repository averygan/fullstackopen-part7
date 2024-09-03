import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import blogReducer from "./reducers/blogReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blog: blogReducer,
  },
});
