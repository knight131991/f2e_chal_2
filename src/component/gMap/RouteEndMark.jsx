import React from "react";
// import PropTypes from "prop-types";
import RouteStopIcon from "./RouteStopIcon";
import End from "../../images/icon/Route_End.png";

function RouteEndMarker(props) {
  return (
    <RouteStopIcon {...props} icon={<img src={End} alt="route icon" />} />
  );
}

export default RouteEndMarker;
