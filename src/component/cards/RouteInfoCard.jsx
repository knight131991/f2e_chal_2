import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import StateLabel from "../StateLabel";
import styled from "styled-components";
import BlodBlockText from "../texts/BlodBlockText";
import StartEndStopInfo from "../StartEndStopInfo";

const StyledStateLable = styled(StateLabel)`
  margin-left: 16px;
`;

const LengthWrapper = styled.span`
  color: #9e9e9e;
  margin-top: 4px;
  font-size: 14px;
  padding-left: 40px;
`;

const DistanceWrapper = styled.span`
  margin-top: 32px;
  padding-bottom: 4px;
  font-size: 14px;
  color: #757575;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const StyledStartEndStopInfo = styled(StartEndStopInfo)`
  margin-top: 20px;
`;

function RouteInfoCard({
  title,
  direction,
  onClick,
  onClickBtn,
  length,
  checked,
  start,
  end,
  distance,
}) {
  return (
    <InfoCard
      title={title}
      btnName="挑戰此路線"
      onClickBtn={onClickBtn}
      onClick={onClick}
      checked={checked}
      extraTitle={direction && <StyledStateLable label={direction} />}
      content={
        <>
          <StyledStartEndStopInfo start={start} end={end} direction={direction} />
          {distance && <LengthWrapper> 距離 {distance} 公里</LengthWrapper>}
          <DistanceWrapper>
            <span> 總長</span> <BlodBlockText> {length} 公里</BlodBlockText>
          </DistanceWrapper>
        </>
      }
    />
  );
}

RouteInfoCard.defaultProps = {
  title: "",
  direction: undefined,
  onClick: () => {},
  onClickBtn: () => {},
  length: undefined,
  start: "",
  end: "",
  distance: undefined,
  checked: false,
};
RouteInfoCard.propTypes = {
  title: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  onClickBtn: PropTypes.func,
  length: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  distance: PropTypes.string,
  checked: PropTypes.bool,
};

export default RouteInfoCard;
