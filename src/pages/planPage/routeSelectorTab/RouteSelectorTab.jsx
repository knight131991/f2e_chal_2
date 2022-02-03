import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import CitySelector from "../../../component/CitySelector";
import FlexBox from "../../../component/FlexBox";
import DirectionCheckBox from "../../../component/DirectionCheckBox";
import InfoCard from "../../../component/InfoCard";
import GMap from "../../../component/gMap/GMap";
import queryString from "query-string";
import useGetRoute from "../../../hooks/useGetRoute";
import { useState } from "react/cjs/react.development";
import cityList from "../../../constant/cityList";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "../stopSelectorTab/FinishPage";
import { useHistory } from "react-router";
import appendDistanceToRouteInfo from "../../../utils/appendDistanceToRouteInfo";

function RouteSelectorTab(props) {
  const [curMode, setCurMode] = useState("route");
  const history = useHistory();
  const { lat, log } = queryString.parse(history.location.search);
  const [city, setCity] = useState(cityList[0].value);
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const { getRoute, data, isLoading } = useGetRoute([]);
  useEffect(() => {
    getRoute(city, (routes) =>
      appendDistanceToRouteInfo({ lat, lng: log }, routes)
    );
  }, [getRoute, city, lat, log]);

  const component = useMemo(() => {
    let component = null;
    switch (curMode) {
      case "stop":
        component = (
          <StopSelector
            city={city}
            routeInfos={routeInfo}
            onSelectCity={setCity}
            onClickReturn={() => setCurMode("route")}
            onSelectStop={(data) => {
              setStopInfo(data);
              setCurMode("finish");
            }}
          />
        );
        break;
      case "route":
        component = (
          <RouteSelector
            city={city}
            onSelectCity={setCity}
            routeInfos={data}
            onSelectRoute={(route) => {
              setRouteInfo(route);
              setCurMode("stop");
            }}
            onSearch={(keyword) => getRoute(city, (resp) => resp, keyword)}
          />
        );
        break;
      case "finish":
        component = <FinishPage stopInfo={stopInfo} routeInfo={routeInfo} />;
        break;
      default:
    }
    return component;
  }, [curMode, data, city, stopInfo, routeInfo, getRoute]);

  return component;
}

RouteSelectorTab.propTypes = {};

export default RouteSelectorTab;
