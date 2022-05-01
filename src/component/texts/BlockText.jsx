import React from "react";
import styled from "styled-components";

function BlockText(props) {
  return <span {...props} />;
}

export default styled(BlockText)`
  color: #424242;
`;
