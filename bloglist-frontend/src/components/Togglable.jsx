import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="secondary" className="mt-3" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Form onSubmit={props.onSubmit}>
          <div className="mb-3">{props.children}</div>
          <div className="d-flex mt-2">
            <Button variant="primary" type="submit" className="me-2">
              {props.buttonLabel}
            </Button>
            <Button variant="secondary" onClick={toggleVisibility}>
              cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
