import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import youbikeList from "../../../constant/youbikeList";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import Toolbar from "../../../component/Toolbar";
import { ReactComponent as SearchIcon } from "../../../images/icon/Search.svg";
// import { ReactComponent as Del } from "../../../images/icon/Del.svg";
import ModeSelector from "../ModeSelector";
import FlexBox from "../../../component/FlexBox";
import CityYoubikeSelector from "../../../component/selector/CityYoubikeSelector";
import { Input } from "antd";
import styled from "styled-components";
import MainContentContainer from "../../../component/MainContentContainer";

const StyledInput = styled(Input)`
  max-width: 277px;
  min-height: 48px;
  font-size: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  border: none;

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-focused {
    border: none;
    box-shadow: none;
  }
  & input {
    background: #f5f5f5;
  }
`;

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
  const [searchKey, setSearchKey] = useState("");
  const [notFoundStop, setNotFoundStop] = useState(false);
  // const history = useHistory();
  // const { lat, log } = queryString.parse(history.location.search);
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo([]);

  useEffect(() => {
    getBikeStopInfo({
      city,
      youbikeVer,
      search: searchKey,
      noSearchResultCB: (flag) => setNotFoundStop(flag),
    });
  }, [getBikeStopInfo, city, youbikeVer, searchKey]);

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
              <StyledInput
                allowClear={{ clearIcon: "sdf" }}
                placeholder="站點搜尋"
                prefix={<SearchIcon />}
                onPressEnter={(e) => setSearchKey(e.target.value)}
              />
            </FlexBox>
          </>
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
    notFoundStop,
    loading,
    youbikeVer,
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
