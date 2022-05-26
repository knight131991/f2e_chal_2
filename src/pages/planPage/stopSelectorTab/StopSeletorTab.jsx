import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import youbikeList from "../../../constant/youbikeList";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import StopSelectorToolbar from "./StopSelectorToolbar";
import Divider from "../../../component/toolbar/Divider";
import RouteSelectorToolbar from "./RouteSelectorToolbar";
import styleParams from "../../../constant/styleParams";
import PlanPageLayout from "../../PlanPageLayout";
import SubToolbar from "../../../component/toolbar/SubToolbar";

export default function StopSeletorTab({ onModeChange, curTabMode }) {
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

  const { component, toolbarComponent, secondToolbar, offsetTop } =
    useMemo(() => {
      const screenGatherThanLg = screen >= screenEnum.lg;
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
          toolbarComponent = screenGatherThanLg && (
            <>
              <Divider />
              <StopSelectorToolbar
                city={city}
                searchKey={searchStop}
                onCityChange={setCity}
                onYoubikeChange={setYoubikeVer}
                youbikeVer={youbikeVer}
                onSearch={setSearchStop}
              />
            </>
          );
          secondToolbar = !screenGatherThanLg && (
            <SubToolbar>
              <StopSelectorToolbar
                city={city}
                onCityChange={setCity}
                searchKey={searchStop}
                onYoubikeChange={setYoubikeVer}
                youbikeVer={youbikeVer}
                onSearch={setSearchStop}
              />
            </SubToolbar>
          );
          offsetTop = screenGatherThanLg ? 0 : subToolbarH;
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
          toolbarComponent = screenGatherThanXl && (
            <>
              <Divider />
              <RouteSelectorToolbar
                routeLen={routeLen}
                onRouteChange={setRouteLen}
                onDireactChange={setDirFilter}
                onSearch={setSearchRoute}
                searchKey={searchRoute}
              />
            </>
          );
          secondToolbar = !screenGatherThanXl && (
            <RouteSelectorToolbar
              routeLen={routeLen}
              onRouteChange={setRouteLen}
              onDireactChange={setDirFilter}
              onSearch={setSearchRoute}
              searchKey={searchRoute}
              render={(selectors, search) =>
                screenGatherThanMd ? (
                  <SubToolbar>
                    {selectors}
                    {search}
                  </SubToolbar>
                ) : (
                  <>
                    <SubToolbar>{selectors}</SubToolbar>
                    <SubToolbar>{search}</SubToolbar>
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
      return {
        component,
        toolbarComponent,
        secondToolbar,
        offsetTop,
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
      searchStop,
    ]);

  return (
    <PlanPageLayout
      onModeChange={onModeChange}
      curMode={curTabMode}
      toolbarComponent={toolbarComponent}
      secondToolbar={secondToolbar}
      offsetTop={offsetTop}
      mainComponent={component}
    />
  );
}

StopSelector.defaultProps = { onModeChange: () => {}, curTabMode: undefined };
StopSelector.propTypes = {
  onModeChange: PropTypes.func,
  curTabMode: PropTypes.string,
};
