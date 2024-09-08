import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteBlog, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(handleDeleteBlog(blog, userData.loggedInUser, navigate));
  };

  if (!blog) return null;
  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="blog-title">
            {blog.title} {blog.author}
          </Card.Title>
          <Card.Text className="mb-2 text-muted">{blog.url}</Card.Text>
          <Card.Text>
            Likes: {blog.likes}{" "}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => addLike(blog)}
            >
              like
            </Button>
          </Card.Text>
          <Card.Text>User: {blog.user.name} </Card.Text>

          <div className="mt-4">
            {blog.user.username === userData.loggedInUser?.username && (
              <Button variant="outline-danger" onClick={() => onDeleteClick()}>
                delete
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <h2 className="mt-3">Comments</h2>
      <CommentForm blogId={blog.id} />
      {blog.comments.length > 0 ? (
        <ul className="list-group list-group-flush mt-3">
          {blog.comments.map((comment, index) => (
            <li className="list-group-item" key={index}>
              {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No comments yet... add one?</p>
      )}
    </div>
  );
};

export default BlogDetails;
