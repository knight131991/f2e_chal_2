import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import GMap from "../../../component/gMap/GMap";
import SwitchableMainContentLayout from "../../../component/SwitchableMainContentLayout";
import ListContainer from "../../../component/list/ListContainer";
import RouteInfoCard from "../../../component/cards/RouteInfoCard";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import styled from "styled-components";
import useGetFilteredRouteInfo from "../../../hooks/useGetFilteredRouteInfo";
import SelectableRouteMarks from "../../../component/gMap/SelectableRouteMarks";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";

const ListTitle = styled.span`
  font-size: 16px;
`;

function RouteSelector({
  routeInfos,
  onSelectRoute,
  loading,
  dirFilter,
  city,
  routeLen,
}) {
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState();
  const refEle = useRef({ list: [] });
  const { screen } = useRWD();

  const { filteredRouteInfos, routeStartStops } = useGetFilteredRouteInfo(
    dirFilter,
    routeInfos
  );

  const handleSelectRoute = useCallback((map, maps, geometry, id) => {
    setSelectedRoute(geometry);
    fitGMapBounds(map, maps, geometry);
    setSelectedRouteId(id);
  }, []);

  useEffect(() => {
    fitGMapBounds(map, maps, routeStartStops);
  }, [routeStartStops, map, maps]);

  useEffect(() => {
    setSelectedRoute([]);
    setSelectedRouteId();
  }, [dirFilter, city, routeLen]);

  return (
    <SwitchableMainContentLayout
      loading={loading}
      switchMode={screen <= screenEnum.md}
      leftContent={
        <>
          <ListTitle>共 {filteredRouteInfos.length} 條路線</ListTitle>
          <ListContainer
            data={filteredRouteInfos.map(
              (
                {
                  RouteName,
                  CyclingLength,
                  RoadSectionStart,
                  RoadSectionEnd,
                  Geometry,
                  Direction,
                },
                id
              ) => (
                <div
                  key={RouteName}
                  ref={(ele) => (refEle.current.list[id] = ele)}
                >
                  <RouteInfoCard
                    key={RouteName}
                    title={RouteName}
                    direction={Direction}
                    onClick={() => handleSelectRoute(map, maps, Geometry, id)}
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
                    length={CyclingLength}
                    checked={selectedRouteId === id}
                    start={RoadSectionStart}
                    end={RoadSectionEnd}
                  />
                </div>
              )
            )}
          />
        </>
      }
      rightContent={
        <GMap
          steps={selectedRoute}
          onMount={(map, maps) => {
            setMap(map);
            setMaps(maps);
          }}
        >
          {SelectableRouteMarks({
            selectedRoute: selectedRoute,
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

RouteSelector.propTypes = {
  city: "",
  routeInfos: [],
  onSelectCity: () => {},
  onSelectRoute: () => {},
  onSearch: () => {},
  dirFilter: [],
};
RouteSelector.propTypes = {
  city: PropTypes.string,
  routeInfos: PropTypes.arrayOf(PropTypes.any),
  onSelectCity: PropTypes.func,
  onSelectRoute: PropTypes.func,
  onSearch: PropTypes.func,
  dirFilter: PropTypes.arrayOf(PropTypes.string),
};

export default RouteSelector;
