import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link, useLocation } from "react-router-dom";

const Bloglist = () => {
  const users = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  const location = useLocation();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!users.loggedInUser) return;
  return (
    <>
      <BlogForm loggedInUser={users.loggedInUser} />
      {blogs.map((blog) => {
        const linkTo =
          location.pathname === "/" ? `/api/blogs/${blog.id}` : `${blog.id}`;
        return (
          <div key={blog.id} style={blogStyle} className="bloglist">
            <Link to={linkTo}>
              <span>{blog.title} </span>
              <span>{blog.author}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Bloglist;
