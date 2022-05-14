import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import Toolbar from "../../../component/Toolbar";
import ModeSelector from "../ModeSelector";
import FlexBox from "../../../component/FlexBox";
import CitySelector from "../../../component/CitySelector";
import { Input } from "antd";

export default function StopSeletorTab({ onModeChange }) {
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

  const { component, toolbarComponent } = useMemo(() => {
    let component = null;
    let toolbarComponent = null;
    switch (curMode) {
      case "stop":
        component = (
          <StopSelector
            stops={data}
            city={city}
            loading={loading}
            showEmptyHint={notFoundStop}
            onSelectStop={(data) => {
              setStopInfo(data);
              setCurMode("route");
            }}
          />
        );
        toolbarComponent = (
          <FlexBox row justify="space-between" flex>
            <CitySelector value={city} onSelect={setCity} />
            <Input.Search
              onSearch={(keywords) =>
                getBikeStopInfo({
                  city,
                  search: keywords,
                  noSearchResultCB: (flag) => setNotFoundStop(flag),
                })
              }
            />
          </FlexBox>
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
    return {
      component,
      toolbarComponent,
    };
  }, [
    curMode,
    data,
    city,
    stopInfo,
    routeInfo,
    getBikeStopInfo,
    notFoundStop,
    loading,
  ]);

  return (
    <>
      <Toolbar>
        <ModeSelector onChange={onModeChange} />
        {toolbarComponent}
      </Toolbar>
      {component}
    </>
  );
}

StopSelector.defaultProps = { onModeChange: () => {} };
StopSelector.propTypes = { onModeChange: PropTypes.func };
