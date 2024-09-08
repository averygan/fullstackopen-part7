import { logoutUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Link, useNavigate } from "react-router-dom";

import { Navbar, Nav, Button } from "react-bootstrap";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    dispatch(logoutUser());
    blogService.setToken(null);
    navigate("/");
  };

  const padding = {
    paddingRight: 10,
    paddingLeft: 10,
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Nav>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">
            Home
          </Link>
        </Nav.Link>

        <Nav.Link href="#" as="span">
          <Link style={padding} to="/api/blogs">
            Blogs
          </Link>
        </Nav.Link>

        <Nav.Link href="#" as="span">
          <Link style={padding} to="/api/users">
            Users
          </Link>
        </Nav.Link>

        {user.loggedInUser ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <em style={padding}>{user.loggedInUser.name} logged in</em>
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              logout
            </Button>
          </div>
        ) : null}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
