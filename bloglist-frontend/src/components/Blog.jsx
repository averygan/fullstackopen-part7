import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      <div style={blogStyle} className="bloglist">
        <Link to={blog.id}>
          <span>{blog.title} </span>
          <span>{blog.author}</span>
        </Link>
      </div>
    </>
  );
};

export default Blog;
