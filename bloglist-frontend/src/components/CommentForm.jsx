import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";

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
      <form onSubmit={addComment}>
        <input type="text" value={newComment} onChange={handleCommentChange} />
        <button type="submit">add comment</button>
      </form>
    </>
  );
};

export default CommentForm;
