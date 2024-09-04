import { setUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { showError } from "../reducers/errorReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const [username, setUsernameLocal] = useState("");
  const [password, setPasswordLocal] = useState("");
  const dispatch = useDispatch();

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
    } catch (exception) {
      console.error("Error object:", exception);
      dispatch(showError("wrong username or password"));
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default LoginForm;
