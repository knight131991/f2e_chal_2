import React from "react";
import PropTypes from "prop-types";
import RouteStartMarker from "./RouteStartMark";
import RouteEndMarker from "./RouteEndMark";
import RouteMarker from "./RouteMarker";

function SelectableRouteMarks({
  selectedRoute,
  allRouteStartStops,
  onClickRouteMark,
}) {
  return selectedRoute.length
    ? [
        { ...selectedRoute[0], Component: RouteStartMarker },
        {
          ...selectedRoute[selectedRoute.length - 1],
          Component: RouteEndMarker,
        },
      ].map(({ lat, lng, Component }, id) => (
        <Component lat={lat} lng={lng} key={id} />
      ))
    : allRouteStartStops.map(({ lat, lng }, id) => (
        <RouteMarker
          lat={lat}
          lng={lng}
          key={id}
          onClick={() => onClickRouteMark(id)}
        />
      ));
}

SelectableRouteMarks.defaultProps = {
  selectedRoute: [],
  allRouteStartStops: [],
  onClickRouteMark: () => {},
};
SelectableRouteMarks.propTypes = {
  selectedRoute: PropTypes.array,
  allRouteStartStops: PropTypes.array,
  onClickRouteMark: PropTypes.func,
};

export default SelectableRouteMarks;
