import { useEffect } from "react";

import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Notification from "./components/Notification";
import Bloglist from "./components/Bloglist";
import Navigation from "./components/Nav";

import { getAllBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  if (!user.loggedInUser) {
    return (
      <>
        <Notification />
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="container">
      <Notification />
      <Navigation />
      <Routes>
        <Route path="/" element={<Bloglist />} />
        <Route path="/api/blogs" element={<Bloglist />} />
        <Route path="/api/users" element={<Users />} />
        <Route path="/api/users/:id" element={<UserDetails />} />
        <Route path="/api/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default App;
