import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteBlog, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);
  const userData = useSelector((state) => state.user);
  const blog = blogs.find((blog) => blog.id === id);

  const addLike = async (blogObject) => {
    try {
      // destructure id and user from blogobject, add the rest to updatedBlog
      const { id, user, ...updatedBlog } = blogObject;
      updatedBlog.likes = updatedBlog.likes + 1;
      await blogService.like(id, updatedBlog);
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

  const onDeleteClick = () => {
    dispatch(handleDeleteBlog(blog, userData.loggedInUser));
  };

  if (!blog) return null;
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>URL: {blog.url}</div>
      <div>
        Likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button>
      </div>
      <div>User: {blog.user.name}</div>
      <div>
        {blog.user.username === userData.loggedInUser?.username && (
          <button onClick={() => onDeleteClick()}>delete</button>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
