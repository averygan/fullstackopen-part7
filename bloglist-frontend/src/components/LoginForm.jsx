import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import Togglable from "./Togglable";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showError } from "../reducers/errorReducer";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsernameLocal] = useState("");
  const [password, setPasswordLocal] = useState("");
  const dispatch = useDispatch();

  if (user.loggedInUser) {
    return null;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsernameLocal("");
      setPasswordLocal("");
    } catch (exception) {
      dispatch(showError("wrong username or password"));
    }
  };

  return (
    <div>
      <Togglable buttonLabel="login">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              value={username}
              onChange={(e) => setUsernameLocal(e.target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => setPasswordLocal(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </Togglable>
    </div>
  );
};

export default LoginForm;
