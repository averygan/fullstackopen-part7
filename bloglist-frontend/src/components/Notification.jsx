import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.error);

  return (
    <>
      {notification && <div className="notification">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
};

export default Notification;
