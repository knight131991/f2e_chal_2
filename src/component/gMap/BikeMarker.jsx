import React from "react";
// import PropTypes from "prop-types";
import { ReactComponent as BikeIcon } from "../../images/icon/Map_Start.svg";
import RouteStopIcon from "./RouteStopIcon";

function BikeMarker(props) {
  return <RouteStopIcon {...props} icon={<BikeIcon />} />;
}

BikeMarker.propTypes = {};

export default BikeMarker;
