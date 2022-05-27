import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import GMap from "../component/gMap/GMap";
import cityList from "../constant/cityList";
import useGetRoute from "../hooks/useGetRoute";
import PageContainer from "../component/PageContainer";
import Toolbar from "../component/toolbar/Toolbar";
import RouteSelectorToolbar from "../component/custom/RouteSelectorToolbar";
import MainContentContainer from "../component/MainContentContainer";
import SwitchableMainContentLayout from "../component/SwitchableMainContentLayout";
import RouteInfoListGroup from "../component/custom/RouteInfoListGroup";
import fitGMapBounds from "../utils/fitGMapBounds";
import useGetFilteredRouteInfo from "../hooks/useGetFilteredRouteInfo";
import SelectableRouteMarks from "../component/gMap/SelectableRouteMarks";
import useRWD from "../hooks/useRWD";
import screenEnum from "../constant/screenEnum";
import SubToolbar from "../component/toolbar/SubToolbar";
import styleParams from "../constant/styleParams";
// import PropTypes from "prop-types";
function BikeRoute(props) {
  const [city, setCity] = useState(cityList[0].value);
  const [dirFilter, setDirFilter] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [routeLen, setRouteLen] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const { getRoute, data, isLoading } = useGetRoute([]);
  const refEle = useRef({ list: [] });
  const { screen } = useRWD();

  useEffect(() => {
    getRoute(city, (val) => val, searchKey, routeLen);
  }, [getRoute, city, searchKey, routeLen]);

  const { filteredRouteInfos, routeStartStops } = useGetFilteredRouteInfo(
    dirFilter,
    data
  );

  useEffect(() => {
    fitGMapBounds(map, maps, routeStartStops);
  }, [routeStartStops, map, maps]);

  useEffect(() => {
    setSelectedRoute([]);
    setSelectedRouteId();
  }, [dirFilter, city, routeLen]);

  const handleSelectRoute = useCallback((map, maps, geometry, id) => {
    setSelectedRoute(geometry);
    fitGMapBounds(map, maps, geometry);
    setSelectedRouteId(id);
  }, []);

  const toolbarComponent = useCallback(
    (render) => (
      <RouteSelectorToolbar
        city={city}
        routeLen={routeLen}
        onCityChange={setCity}
        onRouteLenChange={setRouteLen}
        onDireactChange={setDirFilter}
        searchMarginLeft
        onSearch={setSearchKey}
        render={render}
      />
    ),
    [city, routeLen]
  );

  const { screenGratherThanMd, offsetTop } = useMemo(() => {
    const screenGratherThanMd = screen > screenEnum.md;
    return {
      screenGratherThanMd,
      offsetTop: !screenGratherThanMd && styleParams.secondToolbarHeight,
    };
  }, [screen]);

  return (
    <PageContainer>
      <Toolbar>
        {toolbarComponent((whole, selectors) =>
          screenGratherThanMd ? whole : selectors
        )}
      </Toolbar>
      {!screenGratherThanMd &&
        toolbarComponent((whole, selectors, checkboxGroup, search) => (
          <SubToolbar>
            {checkboxGroup} {search}
          </SubToolbar>
        ))}
      <MainContentContainer offsetTop={offsetTop}>
        <SwitchableMainContentLayout
          switchMode={screen <= screenEnum.md}
          leftContent={
            <RouteInfoListGroup
              refEle={refEle}
              routInfos={filteredRouteInfos}
              hideCardBtn
              selectedRouteId={selectedRouteId}
              onClickCard={(geometry, id) =>
                handleSelectRoute(map, maps, geometry, id)
              }
            />
          }
          rightContent={
            <GMap
              steps={selectedRoute}
              onMount={(_map, _maps) => {
                setMap(_map);
                setMaps(_maps);
              }}
            >
              {SelectableRouteMarks({
                selectedRoute: selectedRoute,
                allRouteStartStops: routeStartStops,
                onClickRouteMark: (id) => {
                  handleSelectRoute(
                    map,
                    maps,
                    filteredRouteInfos[id].Geometry,
                    id
                  );
                  refEle.current.list[id].scrollIntoView({
                    behavior: "smooth",
                  });
                },
              })}
            </GMap>
          }
          loading={isLoading}
        />
      </MainContentContainer>
    </PageContainer>
  );
}

BikeRoute.propTypes = {};

export default BikeRoute;
