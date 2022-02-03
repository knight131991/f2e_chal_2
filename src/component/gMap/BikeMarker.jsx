import React from "react";
// import PropTypes from "prop-types";
import { ReactComponent as BikeIcon } from "../../images/Start.svg";
import styled from "styled-components";

function BikeMarker(props) {
  return (
    <div {...props}>
      <BikeIcon />
    </div>
  );
}

BikeMarker.propTypes = {};

export default styled(BikeMarker)`
  position: relative;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
`;
