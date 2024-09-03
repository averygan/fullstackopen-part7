import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { showNotification } from "./reducers/notificationReducer";
import { showError } from "./reducers/errorReducer";
import { createBlog, setBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";

const App = () => {
  const dispatch = useDispatch();
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.error);
  const blogs = useSelector((state) => state.blog);

  const blogFormRef = useRef();

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      store.dispatch(setBlogs(blogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setUsername(user.username);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showError("wrong username or password"));
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create(blogObject);
      dispatch(
        showNotification(`${blogObject.title} by ${blogObject.author} added`)
      );
      dispatch(createBlog(response));
    } catch (exception) {
      dispatch(
        showError(
          exception.response?.data?.error || "error occurred adding blog"
        )
      );
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  const userInfo = () => (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const handleLike = async (id) => {
    try {
      const allBlogs = await blogService.getAll();
      const updatedBlog = allBlogs.find((blog) => blog.id === id);
      if (updatedBlog) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === id ? updatedBlog : blog
        );
        const sortedBlogs = [...updatedBlogs].sort(compareLikes);
        setBlogs(sortedBlogs);
      }
    } catch (error) {
      console.log("error updating likes");
    }
  };

  const addLike = async (blogObject) => {
    try {
      // destructure id and user from blogobject, add the rest to updatedBlog
      const { id, user, ...updatedBlog } = blogObject;
      updatedBlog.likes = updatedBlog.likes + 1;
      const response = await blogService.like(id, updatedBlog);
      handleLike(id);
      dispatch(showNotification(`like added to "${blogObject.title}"`));
    } catch (exception) {
      dispatch(
        showNotification(
          `Failed to add like to "${blogObject.title}". Please try again.`
        )
      );
    }
  };

  return (
    <div>
      <h1>blogs</h1>
      {notification && <div className="notification">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {user === null && loginForm()}
      {user !== null && userInfo()}
      {user !== null && blogForm()}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogState={blogs}
          setBlogs={setBlogs}
          addLike={addLike}
          loggedInUser={user}
        />
      ))}
    </div>
  );
};

export default App;
