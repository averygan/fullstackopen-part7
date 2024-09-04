import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";
import { deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const userData = useSelector((state) => state.user);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const addLike = async (blogObject) => {
    try {
      // destructure id and user from blogobject, add the rest to updatedBlog
      const { id, user, ...updatedBlog } = blogObject;
      updatedBlog.likes = updatedBlog.likes + 1;
      const response = await blogService.like(id, updatedBlog);
      dispatch(likeBlog(id));
      dispatch(showNotification(`like added to "${blogObject.title}"`));
    } catch (exception) {
      console.log("error: ", exception);
      dispatch(
        showNotification(
          `Failed to add like to "${blogObject.title}". Please try again.`
        )
      );
    }
  };

  const handleDeleteBlog = async (blogObject) => {
    if (!userData.loggedInUser) {
      return alert("Login required to delete blogs");
    }
    if (blogObject.user.username === userData.loggedInUser.username) {
      if (confirm(`Remove ${blogObject.title}?`)) {
        const response = await blogService.deleteBlog(blogObject.id);
        // successful deletion returns no response body
        if (!response) {
          dispatch(deleteBlog(blogObject.id));
          dispatch(
            showNotification(`"${blogObject.title}" deleted successfully`)
          );
        } else {
          dispatch(showError(`failed to delete "${blogObject.title}"`));
        }
      }
      return;
    }
    dispatch(showError(`not authorized to delete "${blogObject.title}"`));
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="bloglist">
      {/* when not visible -> show title and view button */}
      <div style={hideWhenVisible}>
        <span>{blog.title} </span>
        <span>{blog.author}</span>
        <button onClick={toggleVisibility}>view</button>
      </div>

      {/* when visible -> show details and hide button */}
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>hide</button>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}{" "}
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>User: {blog.user.name}</div>
        <div>
          {blog.user.username === userData.loggedInUser?.username && (
            <button onClick={() => handleDeleteBlog(blog)}>delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
