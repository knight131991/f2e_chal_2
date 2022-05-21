import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import InfoCard from "../../../component/InfoCard";
import GMap from "../../../component/gMap/GMap";
import useGetRoute from "../../../hooks/useGetRoute";
import styled from "styled-components";
import getCenterPos from "../../../utils/getCenterPos";
import EmptyResultHint from "../../../component/EmptyResultHint";
import BikeMarker from "../../../component/gMap/BikeMarker";
import appendDistanceToRouteInfo from "../../../utils/appendDistanceToRouteInfo";
import LinkBtn from "../../../component/LinkBtn";
import NoDataHint from "../../../component/NoDataHint";
import FlexSpin from "../../../component/FlexSpin";
import RouteMarker from "../../../component/gMap/RouteMarker";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import RouteStopIcon from "../../../component/gMap/RouteStopIcon";
import StartIcon from "../../../images/icon/Route_Start.png";
import EndIcon from "../../../images/icon/Route_End.png";

const Container = styled(FlexBox)`
  height: 100%;
`;

const ListConainer = styled(FlexBox)`
  overflow: auto;
`;

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
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
  const [centerPos, setCenterPos] = useState();
  const [sortBy] = useState("distance");

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
  }, [city, stopInfo, searchKey, routeLen, dirFilter]);

  useEffect(() => {
    fitGMapBounds(map, maps, routeStartStops);
  }, [routeStartStops, map, maps]);

  return (
    <>
      <FlexBox row></FlexBox>
      <Container row flex>
        <FlexSpin spinning={gettingRoute}>
          <ListConainer flex>
            共{filteredRouteInfos.length}條路線
            {stopInfo.name}
            {filteredRouteInfos.length === 0 ? (
              <NoDataHint />
            ) : (
              filteredRouteInfos
                .sort((a, b) => a[sortBy] - b[sortBy])
                .map(
                  ({
                    RouteName,
                    CyclingLength,
                    RoadSectionStart,
                    RoadSectionEnd,
                    Geometry,
                    Direction,
                    Distance,
                  }) => {
                    return (
                      <InfoCard
                        key={RouteName}
                        title={RouteName}
                        btnName="挑戰此路線"
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
                        onClick={() => {
                          setSelectedRoute(Geometry);
                          setCenterPos(getCenterPos(Geometry));
                          fitGMapBounds(map, maps, Geometry);
                        }}
                        content={
                          <>
                            <span>車道長度：{CyclingLength} 公里</span>
                            <span>
                              {RoadSectionStart} - {RoadSectionEnd}
                            </span>
                            <span> 鄰近起點： {Distance} 公里</span>
                          </>
                        }
                      />
                    );
                  }
                )
            )}
          </ListConainer>
          <GMap
            steps={selectedRoute}
            center={centerPos}
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
                  { ...selectedRoute[0], icon: StartIcon },
                  { ...selectedRoute[selectedRoute.length - 1], icon: EndIcon },
                ].map(({ lat, lng, icon }, id) => (
                  <RouteStopIcon
                    lat={lat}
                    lng={lng}
                    key={id}
                    icon={<img src={icon} alt="route icon" />}
                  />
                ))
              : routeStartStops.map(({ lat, lng }, id) => (
                  <RouteMarker lat={lat} lng={lng} key={id} />
                ))}
          </GMap>
        </FlexSpin>
      </Container>
      <FlexBox align="flex-end">
        <LinkBtn onClick={onClickReturn}>重新選擇站點</LinkBtn>
      </FlexBox>
    </>
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
