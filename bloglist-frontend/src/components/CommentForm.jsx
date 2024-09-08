import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const [newComment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.comment(blogId, newComment);
      dispatch(showNotification(`comment added`));
      dispatch(
        commentBlog({
          id: blogId,
          comment: newComment,
        })
      );
    } catch (exception) {
      setComment("");
      dispatch(
        showError(
          exception.response?.data?.error || "error occurred adding comment"
        )
      );
    }
    setComment("");
  };

  return (
    <>
      <Form onSubmit={addComment}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type your comment here..."
            value={newComment}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
    </>
  );
};

export default CommentForm;
