import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../component/FlexBox";
import styled from "styled-components";

const ScrollHintContainer = styled(FlexBox)`
  gap: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
`;

const WhiteBar = styled.div`
  border: 1px solid #fff;
  width: 1px;
  height: ${({ height }) => `${height}px`};
`;

function ScrollHint(props) {
  return (
    <ScrollHintContainer align="center">
      <WhiteBar height={20} />
      <div>Scroll</div>
      <WhiteBar height={40} />
    </ScrollHintContainer>
  );
}

ScrollHint.propTypes = {};

export default ScrollHint;
