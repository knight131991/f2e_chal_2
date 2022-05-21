import React from "react";
// import PropTypes from "prop-types";
import RouteStopIcon from "./RouteStopIcon";
import Start from "../../images/icon/Route_Start.png";

function RouteEndMarker(props) {
  return (
    <RouteStopIcon {...props} icon={<img src={Start} alt="route icon" />} />
  );
}

export default RouteEndMarker;
