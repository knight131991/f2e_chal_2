import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../FlexBox";
import BlodBlockText from "../texts/BlodBlockText";
import HDivider from "../HDivider";
import StartEndStopInfo from "../StartEndStopInfo";
import { ReactComponent as Route } from "../../images/icon/Route-1.svg";
import { ReactComponent as Refresh } from "../../images/icon/Refresh.svg";
import Button from "../Button";
import styled from "styled-components";

const StyleLink = styled(Button)`
  color: #df9300;
  display: flex;
  padding-top: 0;
  align-items: center;

  &:hover {
    color: #df9300;
  }
`;

const StyledStartEndStopInfo = styled(StartEndStopInfo)`
  margin-top: 18px;
`;

const StyledRoute = styled(Route)`
  margin-right: 12px;
`;

const UpdateTimeWrapper = styled(({ show, ...rest }) => <FlexBox {...rest} />)`
  color: #757575;
  font-size: 12px;
  cursor: pointer;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};

  & > :not(:last-child) {
    margin-right: 12px;
  }
`;

function StopListHeader({
  routeName,
  start,
  end,
  direction,
  stopNum,
  updateTime,
  onClickReselect,
  onClickUpdateTime,
}) {
  return (
    <FlexBox noShrink>
      <FlexBox row>
        <StyledRoute />
        <FlexBox flex>
          <FlexBox flex row justify="space-between">
            <BlodBlockText>{routeName}</BlodBlockText>
            <StyleLink type="link" onClick={onClickReselect}>
              重新選擇路線
            </StyleLink>
          </FlexBox>
          <StyledStartEndStopInfo
            start={start}
            end={end}
            direction={direction}
          />
        </FlexBox>
      </FlexBox>
      <HDivider />
      <FlexBox flex row justify="space-between">
        <span>共 {stopNum} 個站點</span>
        <UpdateTimeWrapper
          show={Boolean(updateTime)}
          onClick={onClickUpdateTime}
          row
          align="center"
        >
          <span>更新時間 {updateTime}</span>
          <Refresh />
        </UpdateTimeWrapper>
      </FlexBox>
    </FlexBox>
  );
}

StopListHeader.defaultProps = {
  onClickReselect: () => {},
  onClickUpdateTime: () => {},
};
StopListHeader.propTypes = {
  onClickReselect: PropTypes.func,
  onClickUpdateTime: PropTypes.func,
};

export default StopListHeader;
