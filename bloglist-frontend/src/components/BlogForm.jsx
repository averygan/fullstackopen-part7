import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";
import blogService from "../services/blogs";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const blogFormRef = useRef();

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create(blogObject);
      dispatch(
        showNotification(`${blogObject.title} by ${blogObject.author} added`)
      );
      dispatch(createBlog(response));
    } catch (exception) {
      console.log(exception);
      dispatch(
        showError(
          exception.response?.data?.error || "error occurred adding blog"
        )
      );
    }
  };

  const callCreateBlog = (event) => {
    event.preventDefault();
    addBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <form onSubmit={callCreateBlog}>
          <div>
            title:
            <input
              type="text"
              data-testid="title"
              value={newBlog.title}
              name="title"
              onChange={handleBlogChange}
              placeholder="title"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              data-testid="author"
              value={newBlog.author}
              name="author"
              onChange={handleBlogChange}
              placeholder="author"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              data-testid="url"
              value={newBlog.url}
              name="url"
              onChange={handleBlogChange}
              placeholder="url"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
