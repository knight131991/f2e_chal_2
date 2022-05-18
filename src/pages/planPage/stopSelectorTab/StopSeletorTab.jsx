import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import youbikeList from "../../../constant/youbikeList";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import Toolbar from "../../../component/Toolbar";
import ModeSelector from "../ModeSelector";
import FlexBox from "../../../component/FlexBox";
import CityYoubikeSelector from "../../../component/selector/CityYoubikeSelector";
import styled from "styled-components";
import MainContentContainer from "../../../component/MainContentContainer";
import DistanceSelector from "../../../component/selector/DistanceSelector";
import Search from "../../../component/Search";

const Divider = styled.div`
  border-left: 1px solid #e0e0e0;
  height: 46px;
  margin: 0 16px;
`;

export default function StopSeletorTab({ onModeChange }) {
  const [curMode, setCurMode] = useState("stop");
  const [city, setCity] = useState(cityList[0].value);
  const [youbikeVer, setYoubikeVer] = useState(youbikeList[0].value);
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const [searchStop, setSearchStop] = useState("");
  const [searchRoute, setSearchRoute] = useState("");
  const [routeLen, setRouteLen] = useState();
  const [notFoundStop, setNotFoundStop] = useState(false);
  // const history = useHistory();
  // const { lat, log } = queryString.parse(history.location.search);
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo([]);

  useEffect(() => {
    getBikeStopInfo({
      city,
      youbikeVer,
      search: searchStop,
      noSearchResultCB: (flag) => setNotFoundStop(flag),
    });
  }, [getBikeStopInfo, city, youbikeVer, searchStop]);

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
          <>
            <Divider />
            <FlexBox row justify="space-between" flex align="center">
              <CityYoubikeSelector
                cityVal={city}
                onCityChange={setCity}
                onYoubikeChange={setYoubikeVer}
                youbikeVal={youbikeVer}
              />
              <Search placeholder="站點搜尋" onPressEnter={setSearchStop} />
            </FlexBox>
          </>
        );
        break;
      case "route":
        component = (
          <RouteSelector
            city={city}
            stopInfo={stopInfo}
            routeLen={routeLen}
            searchKey={searchRoute}
            onClickReturn={() => setCurMode("stop")}
            onSelectRoute={(data) => {
              setRouteInfo(data);
              setCurMode("finish");
            }}
          />
        );
        toolbarComponent = (
          <>
            <Divider />
            <DistanceSelector
              placeholder="車道長度"
              value={routeLen}
              onSelect={setRouteLen}
              prefixStr="車道長度： "
              filterName="CyclingLength"
            />
            <Divider />
            <Search
              placeholder="路線 / 起、迄點搜尋"
              onPressEnter={setSearchRoute}
            />
          </>
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
    notFoundStop,
    loading,
    youbikeVer,
    routeLen,
    searchRoute,
  ]);

  return (
    <>
      <Toolbar>
        <ModeSelector onChange={onModeChange} />
        {toolbarComponent}
      </Toolbar>
      <MainContentContainer>{component}</MainContentContainer>
    </>
  );
}

StopSelector.defaultProps = { onModeChange: () => {} };
StopSelector.propTypes = { onModeChange: PropTypes.func };
