import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    removeUserBlog(state, action) {
      const { userId, blogId } = action.payload;
      const user = state.find((user) => user.id === userId);
      if (user) {
        user.blogs = user.blogs.filter((blog) => blog.id !== blogId);
      }
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      if (updatedUser) {
        return state.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      }
    },
  },
});

export const { setUsers, removeUserBlog, updateUser } = usersSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const updateByUserId = (id) => {
  return async (dispatch) => {
    const updatedUser = await usersService.getUser(id);
    dispatch(updateUser(updatedUser));
  };
};

export default usersSlice.reducer;
