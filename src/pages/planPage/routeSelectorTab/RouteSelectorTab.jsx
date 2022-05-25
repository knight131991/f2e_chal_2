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
import StopSelectorToolbar from "./StopSelectorToolbar";
import youbikeList from "../../../constant/youbikeList";
import Divider from "../../../component/toolbar/Divider";

function RouteSelectorTab({ onModeChange, curTabMode }) {
  const [curMode, setCurMode] = useState("route");
  const history = useHistory();
  const { lat, log } = queryString.parse(history.location.search);
  const [city, setCity] = useState(cityList[0].value);
  const [routeLen, setRouteLen] = useState();
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const [dirFilter, setDirFilter] = useState([]);
  const [searchRoute, setSearchRoute] = useState();
  const [searchStop, setSearchStop] = useState();
  const [youbikeVer, setYoubikeVer] = useState(youbikeList[0].value);
  const { getRoute, data, isLoading } = useGetRoute([]);
  const { screen } = useRWD();

  useEffect(() => {
    getRoute(
      city,
      (routes) => appendDistanceToRouteInfo({ lat, lng: log }, routes),
      searchRoute,
      routeLen
    );
  }, [getRoute, city, lat, log, searchRoute, routeLen]);

  const { component, toolbarComponent, secondToolbar, offsetTop } =
    useMemo(() => {
      const screenGatherThanXl = screen >= screenEnum.xl;
      const screenGatherThanMd = screen >= screenEnum.md;
      const { secondToolbarHeight: subToolbarH } = styleParams;

      let component = null;
      let toolbarComponent = null;
      let secondToolbar = null;
      let offsetTop = 0;

      const StopToolbar = (render) => (
        <StopSelectorToolbar
          city={city}
          onCityChange={setCity}
          youbikeVer={youbikeVer}
          onYoubikeChange={setYoubikeVer}
          onSearch={setSearchStop}
          searchKey={searchStop}
          render={render}
        />
      );

      const RouteToolbar = (render) => (
        <RouteSelectorToolbar
          city={city}
          routeLen={routeLen}
          onCityChange={setCity}
          onRouteLenChange={setRouteLen}
          onDireactChange={setDirFilter}
          onSearch={setSearchRoute}
          searchKey={searchRoute}
          render={render}
        />
      );

      switch (curMode) {
        case "stop":
          component = (
            <StopSelector
              city={city}
              routeInfos={routeInfo}
              searchKey={searchStop}
              onSelectCity={setCity}
              onClickReturn={() => setCurMode("route")}
              onSelectStop={(data) => {
                setStopInfo(data);
                setCurMode("finish");
              }}
            />
          );
          toolbarComponent = screenGatherThanXl && (
            <>
              <Divider />
              {StopToolbar()}
            </>
          );
          secondToolbar =
            !screenGatherThanXl &&
            StopToolbar((whole, cityYoubikeSelect, distanceSelect, search) =>
              screenGatherThanMd ? (
                <Toolbar height={subToolbarH}>{whole}</Toolbar>
              ) : (
                <>
                  <Toolbar height={subToolbarH}>{cityYoubikeSelect}</Toolbar>
                  <Toolbar height={subToolbarH}>
                    <FlexBox flex row justify="space-between">
                      {distanceSelect}
                      {search}
                    </FlexBox>
                  </Toolbar>
                </>
              )
            );
          offsetTop = screenGatherThanXl
            ? 0
            : screenGatherThanMd
            ? subToolbarH
            : subToolbarH * 2;
          break;
        case "route":
          component = (
            <RouteSelector
              city={city}
              routeLen={routeLen}
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
          toolbarComponent = screenGatherThanXl && RouteToolbar();
          secondToolbar =
            !screenGatherThanXl &&
            RouteToolbar((whole, selectors, checkboxGroup, search) =>
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
      searchRoute,
      youbikeVer,
      searchStop,
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
