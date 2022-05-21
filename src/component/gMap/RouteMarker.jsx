import React from "react";
// import PropTypes from "prop-types";
import { ReactComponent as RouteIcon } from "../../images/icon/Map_Route.svg";
import RouteStopIcon from "./RouteStopIcon";

function RouteMarker(props) {
  return <RouteStopIcon {...props} icon={<RouteIcon />} />;
}

export default RouteMarker;
