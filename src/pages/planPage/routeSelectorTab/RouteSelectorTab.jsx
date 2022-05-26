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
import styleParams from "../../../constant/styleParams";
import FlexBox from "../../../component/FlexBox";
import StopSelectorToolbar from "./StopSelectorToolbar";
import youbikeList from "../../../constant/youbikeList";
import Divider from "../../../component/toolbar/Divider";
import { getDefaultYoubikeVerByCity } from "../../../component/selector/CityYoubikeSelector";
import SubToolbar from "../../../component/toolbar/SubToolbar";

function RouteSelectorTab({ onModeChange, curTabMode }) {
  const [curMode, setCurMode] = useState("route");
  const history = useHistory();
  const { lat, log } = queryString.parse(history.location.search);
  const [routeCity, setRouteCity] = useState(cityList[0].value);
  const [stopCity, setStopCity] = useState(cityList[0].value);
  const [routeLen, setRouteLen] = useState();
  const [stopInfo, setStopInfo] = useState({});
  const [routeInfo, setRouteInfo] = useState({});
  const [dirFilter, setDirFilter] = useState([]);
  const [searchRoute, setSearchRoute] = useState();
  const [searchStop, setSearchStop] = useState();
  const [distance, setDistance] = useState();
  const [youbikeVer, setYoubikeVer] = useState(youbikeList[0].value);
  const { getRoute, data, isLoading } = useGetRoute([]);
  const { screen } = useRWD();

  useEffect(() => {
    getRoute(
      routeCity,
      (routes) => appendDistanceToRouteInfo({ lat, lng: log }, routes),
      searchRoute,
      routeLen
    );
  }, [getRoute, routeCity, lat, log, searchRoute, routeLen]);

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
          city={stopCity}
          onCityChange={setStopCity}
          distance={distance}
          youbikeVer={youbikeVer}
          onYoubikeChange={setYoubikeVer}
          onSearch={setSearchStop}
          onDistanceChange={setDistance}
          searchKey={searchStop}
          render={render}
        />
      );

      const RouteToolbar = (render) => (
        <RouteSelectorToolbar
          city={routeCity}
          routeLen={routeLen}
          onCityChange={(val) => {
            setRouteCity(val);
            setStopCity(val);
            setYoubikeVer(getDefaultYoubikeVerByCity(val));
          }}
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
              city={stopCity}
              youbikeVer={youbikeVer}
              routeInfos={routeInfo}
              searchKey={searchStop}
              distance={distance}
              onSelectCity={setStopCity}
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
                <SubToolbar>{whole}</SubToolbar>
              ) : (
                <>
                  <SubToolbar>{cityYoubikeSelect}</SubToolbar>
                  <SubToolbar>
                    <FlexBox flex row justify="space-between">
                      {distanceSelect}
                      {search}
                    </FlexBox>
                  </SubToolbar>
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
              city={routeCity}
              routeLen={routeLen}
              dirFilter={dirFilter}
              onSelectCity={setRouteCity}
              routeInfos={data}
              loading={isLoading}
              onSelectRoute={(route) => {
                setRouteInfo(route);
                setCurMode("stop");
              }}
              onSearch={(keyword) =>
                getRoute(routeCity, (resp) => resp, keyword)
              }
            />
          );
          toolbarComponent = screenGatherThanXl && RouteToolbar();
          secondToolbar =
            !screenGatherThanXl &&
            RouteToolbar((whole, selectors, checkboxGroup, search) =>
              screenGatherThanMd ? (
                <SubToolbar>{whole}</SubToolbar>
              ) : (
                <>
                  <SubToolbar>{selectors}</SubToolbar>
                  <SubToolbar>
                    <FlexBox row flex align="center" justify="space-between">
                      {checkboxGroup}
                      {search}
                    </FlexBox>
                  </SubToolbar>
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
      routeCity,
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
      stopCity,
      distance,
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
