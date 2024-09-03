import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setError(state, action) {
      return action.payload;
    },
    resetError() {
      return "";
    },
  },
});

const { setError, resetError } = errorSlice.actions;

let errorTimeout;

export const showError = (content) => {
  return (dispatch) => {
    if (errorTimeout) clearTimeout(errorTimeout);
    dispatch(setError(content));
    errorTimeout = setTimeout(() => {
      dispatch(resetError());
    }, 5000);
  };
};

export default errorSlice.reducer;
