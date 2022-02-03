import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import DirectionCheckBox from "../../../component/DirectionCheckBox";
import RouteOrderSelector from "../../../component/RouteOrderSelector";
import { Input } from "antd";
import getPos from "../../../utils/getPos";
import GMap from "../../../component/gMap/GMap";
import useGetBikeStopInfo from "../../../hooks/useGetBikeStopInfo";
import directionEnum from "../../../constant/directionEnum";
import Marker from "../../../component/gMap/Marker";
import getCenterPos from "../../../utils/getCenterPos";
import LinkBtn from "../../../component/LinkBtn";

function StopSelector({ city, routeInfos, onClickReturn, onSelectStop }) {
  const { getBikeStopInfo, loading } = useGetBikeStopInfo();
  const [stops, setStops] = useState([]);
  const [searchKey, setSearchKey] = useState();
  useEffect(() => {
    const { direction, geometry } = routeInfos;
    if (direction === directionEnum.unidirection) {
      // 單車道起站位置
      const { lat, lng } = geometry[0];
      getBikeStopInfo({ lat, lng, city, search: searchKey }).then((resp) =>
        setStops(resp)
      );
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
        const resultArr = [...startStops];
        endStops.forEach((item) => {
          if (
            !resultArr
              .map(({ StationUID }) => StationUID)
              .includes(item.StationUID)
          ) {
            resultArr.push(item);
          }
        });
        setStops(resultArr);
      });
    } else {
      console.error("非預期的單車道方線資訊");
    }
  }, [getBikeStopInfo, routeInfos, city, searchKey]);
  return (
    <FlexBox flex>
      <FlexBox row>
        {routeInfos.name}
        <DirectionCheckBox />
        <RouteOrderSelector />
        <Input.Search onSearch={(val) => setSearchKey(val)} />
      </FlexBox>
      共 {stops.length} 個站點
      <GMap
        steps={routeInfos.geometry}
        center={getCenterPos(
          stops.map(({ StationPosition: { PositionLon, PositionLat } }) => ({
            lat: PositionLat,
            lng: PositionLon,
          }))
        )}
      >
        {stops.map((item, id) => {
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
        })}
      </GMap>
      <FlexBox align="flex-end">
        <LinkBtn onClick={onClickReturn}>重新選擇自行車路線</LinkBtn>
      </FlexBox>
    </FlexBox>
  );
}

StopSelector.defaultProps = { onClickReturn: () => {}, onSelectStop: () => {} };
StopSelector.propTypes = {
  onClickReturn: PropTypes.func,
  onSelectStop: PropTypes.func,
};

export default StopSelector;
