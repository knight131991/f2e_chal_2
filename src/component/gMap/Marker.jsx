import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as AvailableMark } from "../../images/map_available.svg";
import { ReactComponent as CloseIcon } from "../../images/Close/Default.svg";
import FlexBox from "../FlexBox";
import Button from "../Button";

const Container = styled.div`
  position: relative;
  transform: translate(-50%, -100%);
  cursor: pointer;
  width: 30px;
  height: 40px;
  ${({ showInfo }) => showInfo && "z-index: 100;"}
`;

const TextWrapper = styled.span`
  display: flex;
  position: absolute;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const InfoCardContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #a0adff;
  padding: 24px;
  font-size: 20px;
  color: #000;
  background: #fff;
  width: 405px;
`;

const AddressWrapper = styled.div`
  color: rgba(0, 0, 0, 0.6);
`;

const TitleWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AvaInfosContainer = styled(FlexBox)`
  padding: 16px 0;
`;

const AvaInfoBlock = styled(({ title, num, ...rest }) => (
  <FlexBox {...rest}>
    <span>{title}</span>
    {num}
  </FlexBox>
))`
  background-color: ${(props) => (props.num > 0 ? "#D3D7F5" : "#EBC0C0")};
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  font-size: 24px;

  & > span {
    font-size: 18px;
  }
`;

function Marker({
  avaRent,
  name,
  address,
  onClickInfoCardBtn,
  btnText,
  showBtn,
  showAvaInfo,
  avaReturn,
  num,
  ...rest
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Container {...rest} showInfo={showInfo}>
      <TextWrapper>{num}</TextWrapper>
      {showInfo && (
        <InfoCardContainer onClick={(e) => e.stopPropagation()}>
          <FlexBox flex row justify="space-between" align="center">
            <TitleWrapper title={name}>{name}</TitleWrapper>{" "}
            <CloseIcon onClick={() => setShowInfo(false)} />
          </FlexBox>
          <AddressWrapper>{address}</AddressWrapper>
          {showAvaInfo && (
            <AvaInfosContainer row gap={8}>
              <AvaInfoBlock
                justify="center"
                align="center"
                title="可租借車輛"
                num={avaRent}
              />
              <AvaInfoBlock
                justify="center"
                align="center"
                title="可歸還車輛"
                num={avaReturn}
              />
            </AvaInfosContainer>
          )}
          {showBtn && (
            <Button type="primary" onClick={onClickInfoCardBtn}>
              {btnText}
            </Button>
          )}
        </InfoCardContainer>
      )}
      <AvailableMark
        onClick={(e) => {
          setShowInfo(true);
          e.stopPropagation();
        }}
      />
    </Container>
  );
}

Marker.defaultProps = {
  avaRent: 0,
};
Marker.propTypes = {
  avaRent: PropTypes.number,
};

export default Marker;
