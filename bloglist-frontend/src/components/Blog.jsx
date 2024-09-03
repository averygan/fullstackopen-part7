import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";

const Blog = ({ blog, blogState, setBlogs, addLike, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const deleteBlog = async (blogObject) => {
    if (!loggedInUser.username) {
      return alert("Login required to delete blogs");
    }
    if (blogObject.user.username === loggedInUser.username) {
      if (confirm(`Remove ${blogObject.title}?`)) {
        const response = await blogService.deleteBlog(blogObject.id);
        // successful deletion returns no response body
        if (!response) {
          setBlogs(blogState.filter((blog) => blog.id !== blogObject.id));
          dispatch(
            showNotification(`"${blogObject.title}" deleted successfully`)
          );
        } else {
          useDispatch(showError(`failed to delete "${blogObject.title}"`));
        }
      }
      return;
    }
    useDispatch(showError(`not authorized to delete "${blogObject.title}"`));
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
          {blog.user.username === loggedInUser?.username && (
            <button onClick={() => deleteBlog(blog)}>delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
