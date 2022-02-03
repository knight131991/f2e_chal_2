import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import GMap from "../../../component/gMap/GMap";
import styled from "styled-components";
import BikeMarker from "../../../component/gMap/BikeMarker";
import getCenterPos from "../../../utils/getCenterPos";

const Card = styled(FlexBox)`
  border: 1px solid #595959;
  padding: 24px;
  font-size: 20px;
`;

function FinishPage({
  stopInfo,
  routeInfo: {
    name: routeName,
    start,
    end,
    length: routeLen,
    direction,
    geometry,
  },
}) {
  return (
    <FlexBox row flex>
      <FlexBox>
        YouBike站點
        <Card>
          <h3>{stopInfo.name}</h3>
          <div>{stopInfo.address}</div>
        </Card>
        路線內容
        <Card>
          <h3>{routeName}</h3>
          <div>
            {start} - {end}
          </div>
          <div>
            車道長度： {routeLen} 公里 {direction}
          </div>
        </Card>
      </FlexBox>
      <GMap
        steps={geometry}
        center={getCenterPos([
          ...geometry,
          { lat: stopInfo.lat, lng: stopInfo.lng },
        ])}
      >
        <BikeMarker lat={stopInfo.lat} lng={stopInfo.lng} />
      </GMap>
    </FlexBox>
  );
}

FinishPage.defaultProps = {
  stopInfo: {},
  routeInfo: {},
};
FinishPage.propTypes = {
  stopInfo: PropTypes.objectOf(PropTypes.any),
  routeInfo: PropTypes.objectOf(PropTypes.any),
};

export default FinishPage;
