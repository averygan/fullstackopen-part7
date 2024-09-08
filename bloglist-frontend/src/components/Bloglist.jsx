import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link, useLocation } from "react-router-dom";

const Bloglist = () => {
  const users = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  const location = useLocation();

  return (
    <>
      <BlogForm loggedInUser={users.loggedInUser} />
      <ul className="list-group pt-3">
        {blogs.map((blog) => {
          const linkTo =
            location.pathname === "/" ? `/api/blogs/${blog.id}` : `${blog.id}`;
          return (
            <div key={blog.id} className="bloglist">
              <li className="list-group-item">
                <Link to={linkTo}>
                  <span>{blog.title} </span>
                  <span>{blog.author}</span>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Bloglist;
