import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import StopSelector from "./StopSelector";
import RouteSelector from "./RouteSelector";
import FinishPage from "./FinishPage";
import cityList from "../../../constant/cityList";
import youbikeList from "../../../constant/youbikeList";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import Toolbar from "../../../component/toolbar/Toolbar";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import StopSelectorToolbar from "./StopSelectorToolbar";
import Divider from "../../../component/toolbar/Divider";
import RouteSelectorToolbar from "./RouteSelectorToolbar";
import styleParams from "../../../constant/styleParams";
import PlanPageLayout from "../../PlanPageLayout";

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
                onCityChange={setCity}
                onYoubikeChange={setYoubikeVer}
                youbikeVer={youbikeVer}
                onSearch={setSearchStop}
              />
            </>
          );
          secondToolbar = !screenGatherThanLg && (
            <Toolbar height={subToolbarH}>
              <StopSelectorToolbar
                city={city}
                onCityChange={setCity}
                onYoubikeChange={setYoubikeVer}
                youbikeVer={youbikeVer}
                onSearch={setSearchStop}
              />
            </Toolbar>
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
              />
            </>
          );
          secondToolbar = !screenGatherThanXl && (
            <RouteSelectorToolbar
              routeLen={routeLen}
              onRouteChange={setRouteLen}
              onDireactChange={setDirFilter}
              onSearch={setSearchRoute}
              render={(selectors, search) =>
                screenGatherThanMd ? (
                  <Toolbar height={subToolbarH}>
                    {selectors}
                    {search}
                  </Toolbar>
                ) : (
                  <>
                    <Toolbar height={subToolbarH}>{selectors}</Toolbar>
                    <Toolbar height={subToolbarH}>{search}</Toolbar>
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
