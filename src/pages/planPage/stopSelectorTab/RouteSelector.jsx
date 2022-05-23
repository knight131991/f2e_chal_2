import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import GMap from "../../../component/gMap/GMap";
import useGetRoute from "../../../hooks/useGetRoute";
import styled from "styled-components";
import EmptyResultHint from "../../../component/EmptyResultHint";
import BikeMarker from "../../../component/gMap/BikeMarker";
import appendDistanceToRouteInfo from "../../../utils/appendDistanceToRouteInfo";
import Button from "../../../component/Button";
import NoDataHint from "../../../component/NoDataHint";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import RouteListHeader from "../../../component/list/RouteListHeader";
import RouteInfoCard from "../../../component/cards/RouteInfoCard";
import { stopCityMaptoRouteCity } from "../../../constant/cityList";
import SwitchableMainContentLayout from "../../../component/SwitchableMainContentLayout";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import useGetFilteredRouteInfo from "../../../hooks/useGetFilteredRouteInfo";
import SelectableRouteMarks from "../../../component/gMap/SelectableRouteMarks";

const ListConainer = styled(FlexBox)`
  overflow: auto;
  margin-top: 16px;
  padding-right: 2px;
  & > * {
    margin-bottom: 16px;
  }
`;

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;

const StyleLink = styled(Button)`
  color: #df9300;

  &:hover {
    color: #df9300;
  }
`;

function RouteSelector({
  city,
  stopInfo,
  onSelectRoute,
  onClickReturn,
  routeLen,
  searchKey,
  dirFilter,
}) {
  const {
    getRoute,
    isLoading: gettingRoute,
    data: routeInfos,
  } = useGetRoute([]);

  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState();
  const [sortBy] = useState("distance");
  const refEle = useRef({ list: [] });
  const { screen } = useRWD();

  useEffect(() => {
    getRoute(
      stopCityMaptoRouteCity(city),
      (routes) => {
        const infos = appendDistanceToRouteInfo(stopInfo, routes);
        infos.sort((a, b) => a.CyclingLength - b.CyclingLength);
        return infos;
      },
      searchKey,
      routeLen
    );
  }, [getRoute, city, stopInfo, searchKey, routeLen]);

  const { filteredRouteInfos, routeStartStops } = useGetFilteredRouteInfo(
    dirFilter,
    routeInfos
  );


  useEffect(() => {
    setSelectedRoute([]);
    setSelectedRouteId();
  }, [city, stopInfo, searchKey, routeLen, dirFilter]);

  useEffect(() => {
    fitGMapBounds(map, maps, routeStartStops);
  }, [routeStartStops, map, maps]);

  const handleSelectRoute = useCallback((map, maps, geometry, id) => {
    setSelectedRoute(geometry);
    fitGMapBounds(map, maps, geometry);
    setSelectedRouteId(id);
  }, []);

  return (
    <SwitchableMainContentLayout
      switchMode={screen <= screenEnum.md}
      loading={gettingRoute}
      leftContent={
        <>
          <RouteListHeader
            routeNum={filteredRouteInfos.length}
            stopName={stopInfo.name}
            extraNode={
              <StyleLink type="link" onClick={onClickReturn}>
                重新選擇站點
              </StyleLink>
            }
          />
          <ListConainer flex>
            {filteredRouteInfos.length === 0 ? (
              <NoDataHint />
            ) : (
              filteredRouteInfos
                .sort((a, b) => a[sortBy] - b[sortBy])
                .map(
                  (
                    {
                      RouteName,
                      CyclingLength,
                      RoadSectionStart,
                      RoadSectionEnd,
                      Geometry,
                      Direction,
                      Distance,
                    },
                    id
                  ) => {
                    return (
                      <div
                        key={RouteName}
                        ref={(ele) => (refEle.current.list[id] = ele)}
                      >
                        <RouteInfoCard
                          checked={selectedRouteId === id}
                          title={RouteName}
                          distance={Distance}
                          direction={Direction}
                          length={CyclingLength}
                          start={RoadSectionStart}
                          end={RoadSectionEnd}
                          onClickBtn={() =>
                            onSelectRoute({
                              name: RouteName,
                              start: RoadSectionStart,
                              end: RoadSectionEnd,
                              length: CyclingLength,
                              direction: Direction,
                              geometry: Geometry,
                            })
                          }
                          onClick={() =>
                            handleSelectRoute(map, maps, Geometry, id)
                          }
                        />
                      </div>
                    );
                  }
                )
            )}
          </ListConainer>
        </>
      }
      rightContent={
        <GMap
          steps={selectedRoute}
          onMount={(_map, _maps) => {
            setMap(_map);
            setMaps(_maps);
          }}
        >
          {filteredRouteInfos.length === 0 && !gettingRoute && (
            <StyledEmptyResultHint specificStr="路線" />
          )}
          <BikeMarker lat={stopInfo.lat} lng={stopInfo.lng} />
          {SelectableRouteMarks({
            selectedRoute,
            allRouteStartStops: routeStartStops,
            onClickRouteMark: (id) => {
              handleSelectRoute(map, maps, filteredRouteInfos[id].Geometry, id);
              refEle.current.list[id].scrollIntoView({ behavior: "smooth" });
            },
          })}
        </GMap>
      }
    />
  );
}

RouteSelector.defaultProps = {
  city: undefined,
  stopInfo: {},
  onSelectRoute: () => {},
  onClickReturn: () => {},
  routeLen: undefined,
  searchKey: "",
  dirFilter: [],
};
RouteSelector.propTypes = {
  city: PropTypes.string,
  stopInfo: PropTypes.objectOf(PropTypes.any),
  onSelectRoute: PropTypes.func,
  onClickReturn: PropTypes.func,
  routeLen: PropTypes.string,
  searchKey: PropTypes.string,
  dirFilter: PropTypes.arrayOf(PropTypes.string),
};

export default RouteSelector;
