import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return "";
    },
  },
});

const { setNotification, resetNotification } = notificationSlice.actions;

let notificationTimeout;

export const showNotification = (content) => {
  return (dispatch) => {
    if (notificationTimeout) clearTimeout(notificationTimeout);
    dispatch(setNotification(content));

    notificationTimeout = setTimeout(() => {
      dispatch(resetNotification());
      notificationTimeout = null; // Reset the timeout ID
    }, 5000);
  };
};

export default notificationSlice.reducer;
