import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import FlexBox from "../../../component/FlexBox";
import GMap from "../../../component/gMap/GMap";
import getPos from "../../../utils/getPos";
import Marker from "../../../component/gMap/Marker";
import CitySelector from "../../../component/CitySelector";
import getCenterPos from "../../../utils/getCenterPos";
import EmptyResultHint from "../../../component/EmptyResultHint";
import styled from "styled-components";

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;
function StopSelector({
  stops,
  onSelectStop,
  city,
  onSelectCity,
  onSearch,
  showEmptyHint,
}) {
  const mapCenter = useMemo(
    () =>
      getCenterPos(
        stops.map(({ StationPosition: { PositionLat, PositionLon } }) => ({
          lat: PositionLat,
          lng: PositionLon,
        }))
      ),
    [stops]
  );

  return (
    <FlexBox flex>
      <FlexBox row justify="space-between">
        <CitySelector value={city} onSelect={onSelectCity} />
        <Input.Search onSearch={onSearch} />
      </FlexBox>
      <GMap center={mapCenter}>
        {showEmptyHint ? (
          <StyledEmptyResultHint />
        ) : (
          stops.map((item, id) => {
            const { lat, lng } = getPos(item);
            const { AvailableRentBikes, StationAddress, StationName } = item;
            const name = StationName.Zh_tw;
            const address = StationAddress.Zh_tw;
            return (
              <Marker
                key={id}
                lat={lat}
                lng={lng}
                avaRent={AvailableRentBikes}
                name={name}
                address={address}
                btnText="選擇路線"
                showBtn
                onClickInfoCardBtn={() =>
                  onSelectStop({ lat, lng, name, address })
                }
              />
            );
          })
        )}
      </GMap>
    </FlexBox>
  );
}

StopSelector.defaultProps = {
  stops: [],
  city: "",
  onSelectCity: () => {},
  onSearch: () => {},
};
StopSelector.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.any),
  city: PropTypes.string,
  onSelectCity: PropTypes.func,
  onSearch: PropTypes.func,
};

export default StopSelector;
