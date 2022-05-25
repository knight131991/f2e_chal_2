import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import { ReactComponent as Start } from "../images/icon/Type_Start.svg";
import { ReactComponent as End } from "../images/icon/Type_End.svg";
import { ReactComponent as Bilateral } from "../images/icon/Bilateral.svg";
import { ReactComponent as Unidireaction } from "../images/icon/Unidirection.svg";
import styled from "styled-components";
import directionEnum from "../constant/directionEnum";

const Container = styled(FlexBox)`
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

function StartEndStopInfo({ start, end, direction, ...rest }) {
  return (
    <Container row align="center" {...rest}>
      <Start />
      <span> {start}</span>
      {direction === directionEnum.unidirection ? (
        <Unidireaction />
      ) : (
        <Bilateral />
      )}
      <End />
      <span>{end}</span>
    </Container>
  );
}

StartEndStopInfo.propTypes = {};

export default StartEndStopInfo;
