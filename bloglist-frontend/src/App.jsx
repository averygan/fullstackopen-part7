import { useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.error);
  const blogs = useSelector((state) => state.blog);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      store.dispatch(setBlogs(blogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    dispatch(logoutUser());
    blogService.setToken(null);
  };

  const userInfo = () => (
    <div>
      <p>
        {userData.loggedInUser.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );

  return (
    <div>
      <h1>blogs</h1>
      {notification && <div className="notification">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {userData.loggedInUser === null && <LoginForm />}
      {userData.loggedInUser !== null && userInfo()}
      {userData.loggedInUser !== null && <BlogForm />}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedInUser={userData.loggedInUser} />
      ))}
    </div>
  );
};

export default App;
