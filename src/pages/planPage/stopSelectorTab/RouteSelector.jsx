import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import { Input } from "antd";
import InfoCard from "../../../component/InfoCard";
import GMap from "../../../component/gMap/GMap";
import DirectionCheckBox from "../../../component/DirectionCheckBox";
import useGetRoute from "../../../hooks/useGetRoute";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import getCenterPos from "../../../utils/getCenterPos";
import EmptyResultHint from "../../../component/EmptyResultHint";
import BikeMarker from "../../../component/gMap/BikeMarker";
import RouteOrderSelector, {
  routeOrders,
} from "../../../component/RouteOrderSelector";
import appendDistanceToRouteInfo from "../../../utils/appendDistanceToRouteInfo";
import LinkBtn from "../../../component/LinkBtn";
import NoDataHint from "../../../component/NoDataHint";
import FlexSpin from "../../../component/FlexSpin";

const Container = styled(FlexBox)`
  height: 0px;
`;

const ListConainer = styled(FlexBox)`
  overflow: auto;
`;

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;

function RouteSelector({ city, stopInfo, onSelectRoute, onClickReturn }) {
  const {
    getRoute,
    isLoading: gettingRoute,
    data: routeInfos,
  } = useGetRoute([]);
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [centerPos, setCenterPos] = useState();
  const [dirFilter, setDirFilter] = useState([]);
  const [sortBy, setSortBy] = useState("distance");

  const fetchRoute = useCallback(
    (searchKey) => {
      getRoute(
        city,
        (routes) => {
          const infos = appendDistanceToRouteInfo(stopInfo, routes);
          infos.sort((a, b) => a.CyclingLength - b.CyclingLength);
          return infos;
        },
        searchKey
      );
    },
    [getRoute, city, stopInfo]
  );

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const filterdRouteInfos = useMemo(() => {
    if (dirFilter.length === 0) return routeInfos;
    return routeInfos.filter(({ Direction }) => dirFilter.includes(Direction));
  }, [dirFilter, routeInfos]);

  const handleCheckboxChange = useCallback((vals) => setDirFilter(vals), []);

  const handleSorterChange = useCallback((val) => {
    if (val === routeOrders.distance) {
      setSortBy("Distance");
    } else if (val === routeOrders.length) {
      setSortBy("CyclingLength");
    } else {
      console.log("非預期的排序值");
    }
  }, []);

  return (
    <>
      <FlexBox row>
        {stopInfo.name}
        <DirectionCheckBox onChange={handleCheckboxChange} />
        <RouteOrderSelector onChange={handleSorterChange} />
        <Input.Search onSearch={(val) => fetchRoute(val)} />
      </FlexBox>
      共{filterdRouteInfos.length}條路線
      <Container row flex>
        <FlexSpin spinning={gettingRoute}>
          <ListConainer flex>
            {filterdRouteInfos.length === 0 ? (
              <NoDataHint />
            ) : (
              filterdRouteInfos
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
          <GMap steps={selectedRoute} center={centerPos}>
            {filterdRouteInfos.length === 0 && !gettingRoute && (
              <StyledEmptyResultHint specificStr="路線" />
            )}
            <BikeMarker lat={stopInfo.lat} lng={stopInfo.lng} />
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
};
RouteSelector.propTypes = {
  city: PropTypes.string,
  stopInfo: PropTypes.objectOf(PropTypes.any),
  onSelectRoute: PropTypes.func,
  onClickReturn: PropTypes.func,
};

export default RouteSelector;
