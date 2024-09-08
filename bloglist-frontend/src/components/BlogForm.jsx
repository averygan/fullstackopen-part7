import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";
import blogService from "../services/blogs";
import { createBlog } from "../reducers/blogReducer";
import { updateByUserId } from "../reducers/usersReducer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BlogForm = ({ loggedInUser }) => {
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
      dispatch(updateByUserId(loggedInUser.id));
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
    <div className="p-3 bg-light rounded shadow-sm">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1>Add new blog:</h1>

          <Togglable
            buttonLabel="create new"
            onSubmit={callCreateBlog}
            ref={blogFormRef}
          >
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                data-testid="title"
                value={newBlog.title}
                name="title"
                onChange={handleBlogChange}
                placeholder="title"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                data-testid="author"
                value={newBlog.author}
                name="author"
                onChange={handleBlogChange}
                placeholder="author"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                data-testid="url"
                value={newBlog.url}
                name="url"
                onChange={handleBlogChange}
                placeholder="url"
              />
            </Form.Group>
          </Togglable>
        </Col>
      </Row>
    </div>
  );
};

export default BlogForm;
