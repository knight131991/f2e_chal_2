import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import StateLabel from "../StateLabel";
import styled from "styled-components";
import { ReactComponent as Start } from "../../images/icon/Type_Start.svg";
import { ReactComponent as End } from "../../images/icon/Type_End.svg";
import { ReactComponent as Bilateral } from "../../images/icon/Bilateral.svg";
import { ReactComponent as Unidireaction } from "../../images/icon/Unidirection.svg";
import FlexBox from "../FlexBox";
import directionEnum from "../../constant/directionEnum";
import BlodBlockText from "../texts/BlodBlockText";

const StyledStateLable = styled(StateLabel)`
  margin-left: 16px;
`;

const StopInfoWrapper = styled(FlexBox)`
  margin-top: 20px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const LengthWrapper = styled.span`
  color: #9e9e9e;
  margin: 4px 0 32px;
  font-size: 14px;
  padding-left: 40px;
`;

const DistanceWrapper = styled.span`
  padding-bottom: 4px;
  font-size: 14px;
  color: #757575;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

function RouteInfoCard({
  title,
  direction,
  onClick,
  onClickBtn,
  length,
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
      extraTitle={direction && <StyledStateLable label={direction} />}
      content={
        <>
          <StopInfoWrapper row align="center">
            <Start />
            <span> {start}</span>
            {direction === directionEnum.unidirection ? (
              <Unidireaction />
            ) : (
              <Bilateral />
            )}
            <End />
            <span>{end}</span>
          </StopInfoWrapper>
          <LengthWrapper> 距離 {distance} 公里</LengthWrapper>
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
};
RouteInfoCard.propTypes = {
  title: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  onClickBtn: PropTypes.func,
  length: PropTypes.number,
  start: PropTypes.string,
  end: PropTypes.string,
  distance: PropTypes.number,
};

export default RouteInfoCard;
