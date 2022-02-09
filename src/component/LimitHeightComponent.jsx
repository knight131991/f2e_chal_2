import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";

function LimitHeightComponent(props) {
  return <FlexBox row flex justify="space-between" {...props} />;
}

export default styled(LimitHeightComponent)`
  max-width: 1296px;
`;
