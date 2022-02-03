import React from "react";
import PropTypes from "prop-types";

function LinkBtn({ children, ...rest }) {
  return <span {...rest}>{children}</span>;
}

LinkBtn.propTypes = { children: undefined };
LinkBtn.propTypes = { children: PropTypes.node };

export default LinkBtn;
