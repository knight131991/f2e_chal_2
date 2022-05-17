import React from "react";
import styled from "styled-components";
import styleParams from '../../constant/styleParams'

function BlackText(props) {
  return <span {...props} />;
}

export default styled(BlackText)`
  color: ${styleParams.text};
`;
