import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../FlexBox";
import { ReactComponent as PositionIcon } from "../../images/icon/PositionName.svg";
import styled from "styled-components";
import styleParams from "../../constant/styleParams";
import BlodBlockText from "../texts/BlodBlockText";
import HDivider from "../HDivider";

const Title = styled(FlexBox)`
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const Content = styled.span`
  color: ${styleParams.grayText};
  font-size: 16px;
`;

function RouteListHeader({ stopName, extraNode, routeNum }) {
  return (
    <FlexBox noShrink>
      <FlexBox flex row align="center" justify="space-between">
        <Title row>
          <PositionIcon />
          <BlodBlockText>{stopName}</BlodBlockText>
        </Title>
        {extraNode}
      </FlexBox>
      <HDivider />
      <Content>共{routeNum}條路線</Content>
    </FlexBox>
  );
}

RouteListHeader.defaultProps = {
  stopName: "",
  extraNode: undefined,
  routeNum: undefined,
};
RouteListHeader.propTypes = {
  stopName: PropTypes.string,
  extraNode: PropTypes.node,
  routeNum: PropTypes.number,
};

export default RouteListHeader;
