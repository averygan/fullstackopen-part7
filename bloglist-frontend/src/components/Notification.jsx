import { useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.error);

  return (
    <div className="container mt-3">
      {notification && (
        <Alert variant="success" className="mb-3">
          {notification}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" className="mb-3">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
