import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import useGetRoute from "../hooks/useGetRoute";

function BikeRoute(props) {
  const { getRoute, data, isLoading } = useGetRoute();

  useEffect(() => {
    getRoute("HsinchuCounty");
  }, []);

  return <div>Route</div>;
}

BikeRoute.propTypes = {};

export default BikeRoute;
