import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import FlexSpin from "../../../component/FlexSpin";
import RouteMarker from "../../../component/gMap/RouteMarker";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import RouteListHeader from "../../../component/list/RouteListHeader";
import { useRWDStyleParams } from "../../../hooks/useRWD";
import RouteInfoCard from "../../../component/cards/RouteInfoCard";
import RouteStartMarker from "../../../component/gMap/RouteStartMark";
import RouteEndMarker from "../../../component/gMap/RouteEndMark";

const Container = styled(FlexBox)`
  height: 100%;
`;

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

const LeftSideContainer = styled(({ paddingLeft, ...rest }) => (
  <FlexBox {...rest} />
))`
  width: 50%;
  margin: 26px 26px 0 ${({ paddingLeft }) => paddingLeft};
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

  const { mainPadding } = useRWDStyleParams();

  useEffect(() => {
    getRoute(
      city,
      (routes) => {
        const infos = appendDistanceToRouteInfo(stopInfo, routes);
        infos.sort((a, b) => a.CyclingLength - b.CyclingLength);
        return infos;
      },
      searchKey,
      routeLen
    );
  }, [getRoute, city, stopInfo, searchKey, routeLen]);

  const { filteredRouteInfos, routeStartStops } = useMemo(() => {
    let filteredRoutes = routeInfos;
    if (dirFilter.length !== 0)
      filteredRoutes = routeInfos.filter(({ Direction }) =>
        dirFilter.includes(Direction)
      );

    const routeStartStops = filteredRoutes.map(({ Geometry }) => Geometry?.[0]);
    return { filteredRouteInfos: filteredRoutes, routeStartStops };
  }, [dirFilter, routeInfos]);

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
    <Container row flex>
      <FlexSpin spinning={gettingRoute}>
        <LeftSideContainer paddingLeft={mainPadding}>
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
                      <RouteInfoCard
                        checked={selectedRouteId === id}
                        key={RouteName}
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
                    );
                  }
                )
            )}
          </ListConainer>
        </LeftSideContainer>
        <GMap
          steps={selectedRoute}
          width="50%"
          onMount={(_map, _maps) => {
            setMap(_map);
            setMaps(_maps);
          }}
        >
          {filteredRouteInfos.length === 0 && !gettingRoute && (
            <StyledEmptyResultHint specificStr="路線" />
          )}
          <BikeMarker lat={stopInfo.lat} lng={stopInfo.lng} />
          {selectedRoute.length
            ? [
                { ...selectedRoute[0], Component: RouteStartMarker },
                {
                  ...selectedRoute[selectedRoute.length - 1],
                  Component: RouteEndMarker,
                },
              ].map(({ lat, lng, Component }, id) => (
                <Component lat={lat} lng={lng} key={id} />
              ))
            : routeStartStops.map(({ lat, lng }, id) => (
                <RouteMarker
                  lat={lat}
                  lng={lng}
                  key={id}
                  onClick={() =>
                    handleSelectRoute(
                      map,
                      maps,
                      filteredRouteInfos[id].Geometry,
                      id
                    )
                  }
                />
              ))}
        </GMap>
      </FlexSpin>
    </Container>
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
