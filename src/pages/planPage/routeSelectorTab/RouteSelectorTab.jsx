import React, { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import queryString from "query-string";
import useGetRoute from "../../../hooks/useGetRoute";
import cityList from "../../../constant/cityList";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "../stopSelectorTab/FinishPage";
import { useHistory } from "react-router";
import appendDistanceToRouteInfo from "../../../utils/appendDistanceToRouteInfo";
import PlanPageLayout from "../../PlanPageLayout";
import RouteSelectorToolbar from "./RouteSelectorToolbar";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import Toolbar from "../../../component/toolbar/Toolbar";
import styleParams from "../../../constant/styleParams";
import FlexBox from "../../../component/FlexBox";

function RouteSelectorTab({ onModeChange, curTabMode }) {
  const [curMode, setCurMode] = useState("route");
  const history = useHistory();
  const { lat, log } = queryString.parse(history.location.search);
  const [city, setCity] = useState(cityList[0].value);
  const [routeLen, setRouteLen] = useState();
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const [dirFilter, setDirFilter] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const { getRoute, data, isLoading } = useGetRoute([]);
  const { screen } = useRWD();

  useEffect(() => {
    getRoute(
      city,
      (routes) => appendDistanceToRouteInfo({ lat, lng: log }, routes),
      searchKey,
      routeLen
    );
  }, [getRoute, city, lat, log, searchKey, routeLen]);

  const { component, toolbarComponent, secondToolbar, offsetTop } =
    useMemo(() => {
      const screenGatherThanXl = screen >= screenEnum.xl;
      const screenGatherThanMd = screen >= screenEnum.md;
      const { secondToolbarHeight: subToolbarH } = styleParams;

      let component = null;
      let toolbarComponent = null;
      let secondToolbar = null;
      let offsetTop = 0;

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
              dirFilter={dirFilter}
              onSelectCity={setCity}
              routeInfos={data}
              loading={isLoading}
              onSelectRoute={(route) => {
                setRouteInfo(route);
                setCurMode("stop");
              }}
              onSearch={(keyword) => getRoute(city, (resp) => resp, keyword)}
            />
          );
          toolbarComponent = screenGatherThanXl && (
            <RouteSelectorToolbar
              city={city}
              routeLen={routeLen}
              onCityChange={setCity}
              onRouteLenChange={setRouteLen}
              onDireactChange={setDirFilter}
              onSearch={setSearchKey}
            />
          );
          secondToolbar = !screenGatherThanXl && (
            <RouteSelectorToolbar
              city={city}
              routeLen={routeLen}
              onCityChange={setCity}
              onRouteLenChange={setRouteLen}
              onDireactChange={setDirFilter}
              onSearch={setSearchKey}
              render={(whole, selectors, checkboxGroup, search) =>
                screenGatherThanMd ? (
                  <Toolbar height={subToolbarH}>{whole}</Toolbar>
                ) : (
                  <>
                    <Toolbar height={subToolbarH}>{selectors}</Toolbar>
                    <Toolbar height={subToolbarH}>
                      <FlexBox row flex align="center" justify="space-between">
                        {checkboxGroup}
                        {search}
                      </FlexBox>
                    </Toolbar>
                  </>
                )
              }
            />
          );
          offsetTop = screenGatherThanXl
            ? 0
            : screenGatherThanMd
            ? subToolbarH
            : subToolbarH * 2;
          break;
        case "finish":
          component = <FinishPage stopInfo={stopInfo} routeInfo={routeInfo} />;
          break;
        default:
      }
      return { component, toolbarComponent, secondToolbar, offsetTop };
    }, [
      curMode,
      data,
      city,
      stopInfo,
      routeInfo,
      getRoute,
      isLoading,
      routeLen,
      dirFilter,
      screen,
    ]);

  return (
    <PlanPageLayout
      curMode={curTabMode}
      onModeChange={onModeChange}
      mainComponent={component}
      toolbarComponent={toolbarComponent}
      secondToolbar={secondToolbar}
      offsetTop={offsetTop}
    />
  );
}

RouteSelectorTab.propTypes = {};

export default RouteSelectorTab;
