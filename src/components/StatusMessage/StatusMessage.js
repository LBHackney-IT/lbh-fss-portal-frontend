import React from "react";
import PropTypes from "prop-types";

const StatusMessage = ({ type, message }) => {
  return <div role="alert">{message}</div>;
};

StatusMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default StatusMessage;
