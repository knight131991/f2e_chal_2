import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import queryString from "query-string";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";

export default function StopSeletorTab() {
  const [curMode, setCurMode] = useState("stop");
  const [city, setCity] = useState(cityList[0].value);
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const [notFoundStop, setNotFoundStop] = useState(false);
  // const history = useHistory();
  // const { lat, log } = queryString.parse(history.location.search);
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo([]);

  useEffect(() => {
    getBikeStopInfo({ city });
  }, [getBikeStopInfo, city]);


  const component = useMemo(() => {
    let component = null;
    switch (curMode) {
      case "stop":
        component = (
          <StopSelector
            stops={data}
            city={city}
            onSearch={(keywords) =>
              getBikeStopInfo({
                city, search: keywords, noSearchResultCB: (flag) =>
                  setNotFoundStop(flag)
              }
              )
            }
            showEmptyHint={notFoundStop}
            onSelectCity={setCity}
            onSelectStop={(data) => {
              setStopInfo(data);
              setCurMode("route");
            }}
          />
        );
        break;
      case "route":
        component = (
          <RouteSelector
            city={city}
            stopInfo={stopInfo}
            onClickReturn={() => setCurMode("stop")}
            onSelectRoute={(data) => {
              setRouteInfo(data);
              setCurMode("finish");
            }}
          />
        );
        break;
      case "finish":
        component = <FinishPage stopInfo={stopInfo} routeInfo={routeInfo} />;
        break;
      default:
    }
    return component;
  }, [curMode, data, city, stopInfo, routeInfo, getBikeStopInfo, notFoundStop]);

  return component;
}
