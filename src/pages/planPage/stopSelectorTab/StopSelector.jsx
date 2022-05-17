import React, { useMemo } from "react";
import PropTypes from "prop-types";
import GMap from "../../../component/gMap/GMap";
import getPos from "../../../utils/getPos";
import Marker from "../../../component/gMap/Marker";
import getCenterPos from "../../../utils/getCenterPos";
import EmptyResultHint from "../../../component/EmptyResultHint";
import styled from "styled-components";
import FlexSpin from "../../../component/FlexSpin";
import utcToTime from "../../../utils/utcToTime";

const StyledEmptyResultHint = styled(EmptyResultHint)`
  transform: translate(-50%, -50%);
`;
function StopSelector({ stops, onSelectStop, loading, showEmptyHint }) {
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
    <FlexSpin spinning={loading}>
      <GMap center={mapCenter}>
        {showEmptyHint ? (
          <StyledEmptyResultHint />
        ) : (
          stops.map((item, id) => {
            const { lat, lng } = getPos(item);
            const {
              AvailableRentBikes,
              StationAddress,
              StationName,
              UpdateTime,
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
                updateTime={utcToTime(UpdateTime)}
                name={name}
                address={address}
                btnText="選擇路線"
                showBtn
                errHint={!AvailableRentBikes && "目前無車輛可租用"}
                onClickInfoCardBtn={() =>
                  onSelectStop({ lat, lng, name, address })
                }
              />
            );
          })
        )}
      </GMap>
    </FlexSpin>
  );
}

StopSelector.defaultProps = {
  stops: [],
  loading: false,
};
StopSelector.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default StopSelector;
