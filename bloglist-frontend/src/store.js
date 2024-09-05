import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});
