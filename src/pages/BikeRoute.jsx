import { Input } from "antd";
import React, { useEffect, useMemo } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import DarkPad from "../component/DarkPad";
import FlexBox from "../component/FlexBox";
import GMap from "../component/gMap/GMap";
import InfoCard from "../component/InfoCard";
import RouteFilters from "../component/RouteFilters";
import { useOrderChange } from "../component/RouteOrderSelector";
import cityList from "../constant/cityList";
import useGetRoute from "../hooks/useGetRoute";
import getCenterPos from "../utils/getCenterPos";
// import PropTypes from "prop-types";

const Container = styled(FlexBox)`
  height: 0px;
`;

const ListConainer = styled(FlexBox)`
  overflow: auto;
`;

function BikeRoute(props) {
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [city, setCity] = useState(cityList[0].value);
  const [centerPos, setCenterPos] = useState();
  const [dirFilter, setDirFilter] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { getRoute, data, isLoading } = useGetRoute([]);
  const { handleSorterChange, sortBy } = useOrderChange();

  useEffect(() => {
    getRoute(city, (val) => val, searchKey);
  }, [getRoute, city, searchKey]);

  const filterdRouteInfos = useMemo(() => {
    if (dirFilter.length === 0) return data;
    return data.filter(({ Direction }) => dirFilter.includes(Direction));
  }, [dirFilter, data]);

  return (
    <FlexBox flex>
      自行車路線
      <DarkPad flex>
        <FlexBox row>
          <RouteFilters
            city={city}
            onSelectCity={setCity}
            onRouterOrderChange={handleSorterChange}
            onDirectionChange={setDirFilter}
          />
          <Input.Search onSearch={setSearchKey} />
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
      </DarkPad>
    </FlexBox>
  );
}

BikeRoute.propTypes = {};

export default BikeRoute;
