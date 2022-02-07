import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import { routeOrders, useOrderChange } from "../../../component/RouteOrderSelector";
import { Input } from "antd";
import styled from "styled-components";
import InfoCard from "../../../component/InfoCard";
import GMap from "../../../component/gMap/GMap";
import getCenterPos from "../../../utils/getCenterPos";
import { useCallback } from "react/cjs/react.development";
import RouteFilters from "../../../component/RouteFilters";

const Container = styled(FlexBox)`
  height: 0px;
`;

const ListConainer = styled(FlexBox)`
  overflow: auto;
`;

function RouteSelector({
  city,
  routeInfos,
  onSelectCity,
  onSelectRoute,
  onSearch,
}) {
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [centerPos, setCenterPos] = useState();
  const [dirFilter, setDirFilter] = useState([]);
  const {handleSorterChange, sortBy} = useOrderChange();

  const filterdRouteInfos = useMemo(() => {
    if (dirFilter.length === 0) return routeInfos;
    return routeInfos.filter(({ Direction }) => dirFilter.includes(Direction));
  }, [dirFilter, routeInfos]);


  return (
    <FlexBox flex>
      <FlexBox row>
        <RouteFilters
          city={city}
          onSelectCity={onSelectCity}
          onRouterOrderChange={handleSorterChange}
          onDirectionChange={setDirFilter}
        />
        <Input.Search onSearch={onSearch} />
      </FlexBox>
      共 {filterdRouteInfos.length} 條路線
      <Container row flex>
        <ListConainer flex>
          {filterdRouteInfos
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
                },
                id
              ) => (
                <InfoCard
                  key={id}
                  title={RouteName}
                  onClick={() => {
                    setSelectedRoute(Geometry);
                    setCenterPos(getCenterPos(Geometry));
                  }}
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
                  btnName="鄰近站點"
                  content={
                    <>
                      <span>
                        {RoadSectionStart} - {RoadSectionEnd}
                      </span>
                      <span>
                        車道長度：{CyclingLength} 公里 {Direction}
                      </span>
                    </>
                  }
                />
              )
            )}
        </ListConainer>
        <GMap steps={selectedRoute} center={centerPos} />
      </Container>
    </FlexBox>
  );
}

RouteSelector.propTypes = {
  city: "",
  routeInfos: [],
  onSelectCity: () => {},
  onSelectRoute: () => {},
  onSearch: () => {},
};
RouteSelector.propTypes = {
  city: PropTypes.string,
  routeInfos: PropTypes.arrayOf(PropTypes.any),
  onSelectCity: PropTypes.func,
  onSelectRoute: PropTypes.func,
  onSearch: PropTypes.func,
};

export default RouteSelector;
