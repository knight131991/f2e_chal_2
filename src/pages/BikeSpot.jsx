import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import FlexBox from "../component/FlexBox";
import DarkPad from "../component/DarkPad";
import CitySelector from "../component/selector/CitySelector";
import { Input, Radio } from "antd";
import RadioButton from "../component/RadioButton";
import cityList from "../constant/cityList";
import GMap from "../component/gMap/GMap";
import useGetBikeStopInfo from "../hooks/useGetBikeStopInfo";
import Marker from "../component/gMap/Marker";
import getPos from "../utils/getPos";
import getCenterPos from "../utils/getCenterPos";
import FlexSpin from "../component/FlexSpin";
import EmptyResultHint from "../component/EmptyResultHint";
import styled from "styled-components";

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;
function BikeSpot(props) {
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo();
  const [city, setCity] = useState(cityList[0].value);
  const [curMode, setCurMode] = useState("bike");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getBikeStopInfo({ city, top: 100, search: searchKey });
  }, [city, getBikeStopInfo, searchKey]);

  return (
    <FlexBox flex>
      Youbike地圖
      <DarkPad flex>
        <FlexBox row>
          <CitySelector value={city} onSelect={setCity} />
          <Radio.Group
            buttonStyle="solid"
            value={curMode}
            onChange={(e) => setCurMode(e.target.value)}
          >
            <RadioButton value="bike">找單車</RadioButton>
            <RadioButton value="park">找車位</RadioButton>
          </Radio.Group>
          <Input.Search onSearch={setSearchKey} />
        </FlexBox>
        <FlexSpin spinning={loading}>
          <GMap
            center={getCenterPos(
              data.map(({ StationPosition: { PositionLat, PositionLon } }) => ({
                lat: PositionLat,
                lng: PositionLon,
              }))
            )}
          >
            {data.length === 0 ? (
              <StyledEmptyResultHint />
            ) : (
              data.map((item, id) => {
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
                    num={
                      curMode === "bike"
                        ? AvailableRentBikes
                        : AvailableReturnBikes
                    }
                    avaRent={AvailableRentBikes}
                    avaReturn={AvailableReturnBikes}
                    name={name}
                    showAvaInfo
                    address={address}
                  />
                );
              })
            )}
          </GMap>
        </FlexSpin>
      </DarkPad>
    </FlexBox>
  );
}

BikeSpot.propTypes = {};

export default BikeSpot;
