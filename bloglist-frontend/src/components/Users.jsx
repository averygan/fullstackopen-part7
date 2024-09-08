import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
