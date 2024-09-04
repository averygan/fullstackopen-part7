import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blogToLike = state.find((blog) => blog.id === id);
      if (blogToLike) {
        blogToLike.likes += 1;
      }
      state.sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { createBlog, appendBlog, setBlogs, likeBlog, deleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
