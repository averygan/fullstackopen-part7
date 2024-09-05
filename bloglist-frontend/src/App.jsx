import { useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import { getAllBlogs } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.error);
  const blogs = useSelector((state) => state.blog);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllUsers());
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
    <Router>
      <div>
        <h1>blogs</h1>
        {notification && <div className="notification">{notification}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        {userData.loggedInUser === null && <LoginForm />}
        {userData.loggedInUser !== null && userInfo()}
        {userData.loggedInUser !== null && (
          <BlogForm loggedInUser={userData.loggedInUser} />
        )}

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUser={userData.loggedInUser}
          />
        ))}

        <Users />
        <UserDetails />
      </div>
    </Router>
  );
};

export default App;
