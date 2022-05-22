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
import styled from "styled-components";
import MainContentContainer from "../../../component/MainContentContainer";
import DistanceSelector from "../../../component/selector/DistanceSelector";
import Search from "../../../component/Search";
import CheckboxGroup from "../../../component/CheckboxGroup";
import { directionList } from "../../../constant/directionEnum";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import StopSelectorToolbar from "./StopSelectorToolbar";

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
  const [dirFilter, setDirFilter] = useState([]);
  // const history = useHistory();
  // const { lat, log } = queryString.parse(history.location.search);
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo([]);
  const { screen } = useRWD();

  useEffect(() => {
    getBikeStopInfo({
      city,
      youbikeVer,
      search: searchStop,
      noSearchResultCB: (flag) => setNotFoundStop(flag),
    });
  }, [getBikeStopInfo, city, youbikeVer, searchStop]);

  const { component, toolbarComponent, secondToolbar } = useMemo(() => {
    let component = null;
    let toolbarComponent = null;
    let secondToolbar = null;
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
        toolbarComponent = screen >= screenEnum.lg && (
          <>
            <Divider />
            <StopSelectorToolbar
              city={city}
              onCityChange={setCity}
              onYoubikeChange={setYoubikeVer}
              youbikeVer={youbikeVer}
              onSearch={setSearchStop}
            />
          </>
        );
        secondToolbar = screen < screenEnum.lg && (
          <Toolbar height={78}>
            <StopSelectorToolbar
              city={city}
              onCityChange={setCity}
              onYoubikeChange={setYoubikeVer}
              youbikeVer={youbikeVer}
              onSearch={setSearchStop}
            />
          </Toolbar>
        );
        break;
      case "route":
        component = (
          <RouteSelector
            city={city}
            stopInfo={stopInfo}
            routeLen={routeLen}
            searchKey={searchRoute}
            dirFilter={dirFilter}
            onClickReturn={() => setCurMode("stop")}
            onSelectRoute={(data) => {
              setRouteInfo(data);
              setCurMode("finish");
            }}
          />
        );
        toolbarComponent = (
          <FlexBox flex row justify="space-between" align="center">
            <FlexBox row align="center">
              <Divider />
              <DistanceSelector
                placeholder="車道長度"
                value={routeLen}
                onSelect={setRouteLen}
                prefixStr="車道長度： "
                filterName="CyclingLength"
              />
              <Divider />
              <CheckboxGroup options={directionList} onChange={setDirFilter} />
            </FlexBox>
            <Search
              placeholder="路線 / 起、迄點搜尋"
              onPressEnter={setSearchRoute}
            />
          </FlexBox>
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
      secondToolbar,
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
    dirFilter,
    screen,
  ]);

  return (
    <>
      <Toolbar>
        <ModeSelector onChange={onModeChange} />
        {toolbarComponent}
      </Toolbar>
      {secondToolbar}
      <MainContentContainer hasSecondToolbar={Boolean(secondToolbar)}>
        {component}
      </MainContentContainer>
    </>
  );
}

StopSelector.defaultProps = { onModeChange: () => {} };
StopSelector.propTypes = { onModeChange: PropTypes.func };
