import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const UserDetails = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  if (!user) return null;
  return (
    <Container className="my-3">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <h1>{user.name}</h1>
          <h2>added blogs</h2>
          <ListGroup>
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
