import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import loginService from "../services/login";
import blogService from "../services/blogs";
import { showError } from "../reducers/errorReducer";
import { setUser } from "../reducers/userReducer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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
      dispatch(showError(""));
    } catch (exception) {
      dispatch(showError("wrong username or password"));
    }
  };

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 mt-5 shadow">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>username</Form.Label>
                <Form.Control
                  data-testid="username"
                  value={username}
                  onChange={(e) => setUsernameLocal(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>password</Form.Label>
                <Form.Control
                  data-testid="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPasswordLocal(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
