import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const users = useSelector((state) => state.users);
  const id = useParams();
  const user = users.find((user) => user.id === id);

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export default UserDetails;
