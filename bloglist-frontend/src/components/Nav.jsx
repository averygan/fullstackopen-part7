import { logoutUser } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    dispatch(logoutUser());
    blogService.setToken(null);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/api/blogs">Blogs</Link>
      <Link to="/api/users">Users</Link>
      {user.loggedInUser ? (
        <>
          {user.loggedInUser.name} logged in
          <button onClick={handleLogout}>logout</button>
        </>
      ) : null}
    </div>
  );
};

export default Nav;
