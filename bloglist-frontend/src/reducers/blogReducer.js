import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";
import { showError } from "./errorReducer";
import { updateByUserId } from "./usersReducer";

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

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const handleDeleteBlog = (blogObject, loggedInUser) => {
  return async (dispatch) => {
    if (!loggedInUser) {
      return alert("Login required to delete blogs");
    }
    if (blogObject.user.username === loggedInUser.username) {
      if (confirm(`Remove ${blogObject.title}?`)) {
        const response = await blogService.deleteBlog(blogObject.id);
        // successful deletion returns no response body
        if (!response) {
          dispatch(deleteBlog(blogObject.id));
          dispatch(
            showNotification(`"${blogObject.title}" deleted successfully`)
          );
          dispatch(updateByUserId(blogObject.user.id));
        } else {
          dispatch(showError(`failed to delete "${blogObject.title}"`));
        }
      }
    } else {
      dispatch(showError(`not authorized to delete "${blogObject.title}"`));
    }
  };
};

export default blogSlice.reducer;
