import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getPos from "../../../utils/getPos";
import GMap from "../../../component/gMap/GMap";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import directionEnum from "../../../constant/directionEnum";
import Marker from "../../../component/gMap/Marker";
import EmptyResultHint from "../../../component/EmptyResultHint";
import styled from "styled-components";
import SwitchableMainContentLayout from "../../../component/SwitchableMainContentLayout";
import StopListHeader from "../../../component/list/StopListHeader";
import StopInfoCard from "../../../component/cards/StopInfoCard";
import ListContainer from "../../../component/list/ListContainer";
import getDistanceFromLatLon from "../../../utils/getDistanceFromLatLon";
import utcToTime from "../../../utils/utcToTime";
import RouteStartMarker from "../../../component/gMap/RouteStartMark";
import RouteEndMarker from "../../../component/gMap/RouteEndMark";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;
function StopSelector({
  city,
  routeInfos,
  onClickReturn,
  onSelectStop,
  searchKey,
}) {
  const { getBikeStopInfo, loading } = useGetBikeStopInfo();
  const [stops, setStops] = useState([]);
  const [showNoDataHint, setShowNoDataHint] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const { screen } = useRWD();

  const {
    start: startStop,
    end: endStop,
    name: routeName,
    direction,
    geometry,
  } = routeInfos;

  useEffect(() => {
    const { direction, geometry } = routeInfos;
    const addDistanceToStops = (stops, position) =>
      stops.map((item) => {
        const { PositionLat, PositionLon } = item.StationPosition;
        return {
          ...item,
          Distance: getDistanceFromLatLon(position, {
            lat: PositionLat,
            lng: PositionLon,
          }),
        };
      });
    if (direction === directionEnum.unidirection) {
      // 單車道起站位置
      const { lat, lng } = geometry[0];
      getBikeStopInfo({
        lat,
        lng,
        city,
        search: searchKey,
        noSearchResultCB: () => setShowNoDataHint(true),
      }).then((resp) => {
        setStops(addDistanceToStops(resp, geometry[0]));
        setShowNoDataHint(false);
      });
    } else if (direction === directionEnum.bilateral) {
      // 單車道起站位置
      const { lat: startLat, lng: startLng } = geometry[0];
      // 單車道末站位置
      const { lat: endLat, lng: endLng } = geometry[geometry.length - 1];
      Promise.all([
        getBikeStopInfo({
          lat: startLat,
          lng: startLng,
          city,
          search: searchKey,
        }),
        getBikeStopInfo({ lat: endLat, lng: endLng, city, search: searchKey }),
      ]).then((values) => {
        const [startStops, endStops] = values;
        setShowNoDataHint(startStops.length === 0 && endStops.length === 0);
        const resultArr = addDistanceToStops(startStops, geometry[0]);
        endStops.forEach((item) => {
          if (
            !resultArr
              .map(({ StationUID }) => StationUID)
              .includes(item.StationUID)
          ) {
            resultArr.push(
              addDistanceToStops([item], geometry[geometry.length - 1])[0]
            );
          }
        });

        setStops(resultArr);
      });
    } else {
      console.error("非預期的單車道方線資訊");
    }
  }, [getBikeStopInfo, routeInfos, city, searchKey, refresh]);

  useEffect(() => {
    fitGMapBounds(map, maps, [
      geometry[0],
      geometry[geometry.length - 1],
      ...stops.map(({ StationPosition: { PositionLon, PositionLat } }) => ({
        lat: PositionLat,
        lng: PositionLon,
      })),
    ]);
  }, [stops, geometry, map, maps]);

  return (
    <SwitchableMainContentLayout
      loading={loading}
      switchMode={screen <= screenEnum.md}
      leftContent={
        <>
          <StopListHeader
            routeName={routeName}
            stopNum={stops.length}
            start={startStop}
            end={endStop}
            updateTime={utcToTime(stops?.[0]?.UpdateTime)}
            onClickReselect={onClickReturn}
            onClickUpdateTime={() => setRefresh(!refresh)}
            direction={direction}
          />
          <ListContainer
            data={stops.map(({ StationName, StationAddress, Distance }, id) => (
              <StopInfoCard
                key={id}
                title={StationName.Zh_tw}
                address={StationAddress.Zh_tw}
                distance={Distance}
              />
            ))}
          />
        </>
      }
      rightContent={
        <GMap
          onMount={(_map, _maps) => {
            setMap(_map);
            setMaps(_maps);
          }}
          steps={geometry}
        >
          {showNoDataHint ? (
            <StyledEmptyResultHint />
          ) : (
            stops
              .map((item, id) => {
                const { lat, lng } = getPos(item);
                const {
                  AvailableRentBikes,
                  AvailableReturnBikes,
                  StationAddress,
                  StationName,
                } = item;
                const name = StationName.Zh_tw;
                const address = StationAddress.Zh_tw;
                return (
                  <Marker
                    key={id}
                    lat={lat}
                    lng={lng}
                    num={AvailableRentBikes}
                    avaRent={AvailableRentBikes}
                    avaReturn={AvailableReturnBikes}
                    name={name}
                    btnText="選擇站點"
                    showBtn
                    showAvaInfo
                    address={address}
                    onClickInfoCardBtn={() =>
                      onSelectStop({ lat, lng, name, address })
                    }
                  />
                );
              })
              .concat([
                <RouteStartMarker
                  key="start"
                  lat={geometry[0].lat}
                  lng={geometry[0].lng}
                />,
                <RouteEndMarker
                  key="end"
                  lat={geometry[geometry.length - 1].lat}
                  lng={geometry[geometry.length - 1].lng}
                />,
              ])
          )}
        </GMap>
      }
    />
  );
}

StopSelector.defaultProps = { onClickReturn: () => {}, onSelectStop: () => {} };
StopSelector.propTypes = {
  onClickReturn: PropTypes.func,
  onSelectStop: PropTypes.func,
};

export default StopSelector;
