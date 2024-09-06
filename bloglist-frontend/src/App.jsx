import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Notification from "./components/Notification";
import Bloglist from "./components/Bloglist";
import Nav from "./components/Nav";
import { getAllBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  return (
    <>
      <Notification />
      <Router>
        <Nav />
        <LoginForm />
        <Routes>
          {user.loggedInUser && (
            <>
              <Route path="/" element={<Bloglist />} />
              <Route path="/api/blogs" element={<Bloglist />} />
              <Route path="/api/users" element={<Users />} />
              <Route path="/api/users/:id" element={<UserDetails />} />
              <Route path="/api/blogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
