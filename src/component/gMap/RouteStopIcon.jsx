import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

function RouteStopIcon({ icon, ...rest }) {
  return <div {...rest}>{icon}</div>;
}

RouteStopIcon.propTypes = {};

export default styled(RouteStopIcon)`
  position: relative;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
`;
