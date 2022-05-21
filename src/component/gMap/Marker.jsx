import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as AvailableMark } from "../../images/map_available.svg";
import { ReactComponent as CloseIcon } from "../../images/Close/Default.svg";
import { ReactComponent as ErrorIcon } from "../../images/icon/Error.svg";
import FlexBox from "../FlexBox";
import Button from "../Button";
import styleParams from "../../constant/styleParams";

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
  color: white;
  font-size: 18px;
`;

const InfoCardContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid ${styleParams.mainColorDark};
  padding: 16px;
  font-size: 16px;
  color: ${styleParams.text};
  background: #fff;
  max-width: 400px;
  border-radius: 8px;
`;

const InfoCardTitleBar = styled(FlexBox)`
  margin-bottom: 8px;
`;

const ErrorHint = styled(FlexBox)`
  & > :not(:last-child) {
    margin-right: 8px;
  }
  margin-top: 8px;
  font-size: 14px;
  color: ${styleParams.errColor};
`;

const StyledCloseIcon = styled(CloseIcon)`
  flex-shrink: noshrink;
`;

const TitleWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  margin-right: 16px;
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
  background-color: ${(props) =>
    props.num > 0 ? styleParams.mainColorDark : styleParams.errColor};
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  font-size: 24px;

  & > span {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled(FlexBox)`
  margin-top: 16px;
`;

const StyledAvailableMark = styled(({ num, ...rest }) => (
  <AvailableMark {...rest} />
))`
  color: ${({ num }) =>
    num ? styleParams.mainColorDark : styleParams.errColor};
`;

const UpdateTime = styled.span`
  font-size: 12px;
  white-space: nowrap;
  margin-left: 32px;
`;

function Marker({
  avaRent,
  name,
  address,
  onClickInfoCardBtn,
  onCloseInfoCard = () => {},
  onClick = () => {},
  showInfoCard,
  btnText,
  showBtn,
  showAvaInfo,
  avaReturn,
  num,
  errHint,
  updateTime,
  ...rest
}) {
  return (
    <Container {...rest} showInfo={showInfoCard}>
      <TextWrapper>{num}</TextWrapper>
      {showInfoCard && (
        <InfoCardContainer onClick={(e) => e.stopPropagation()}>
          <InfoCardTitleBar flex row justify="space-between" align="center">
            <TitleWrapper title={name}>{name}</TitleWrapper>
            <StyledCloseIcon onClick={onCloseInfoCard} />
          </InfoCardTitleBar>
          <div>{address}</div>
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
          {errHint && (
            <ErrorHint row>
              <ErrorIcon />
              <span>{errHint}</span>
            </ErrorHint>
          )}
          {showBtn && (
            <ButtonWrapper row justify="space-between" align="center">
              <Button onClick={onClickInfoCardBtn}>{btnText}</Button>
              <UpdateTime>更新時間：{updateTime}</UpdateTime>
            </ButtonWrapper>
          )}
        </InfoCardContainer>
      )}
      <StyledAvailableMark
        num={num}
        onClick={(e) => {
          onClick();
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
