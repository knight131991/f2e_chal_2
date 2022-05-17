import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import Footer from "../../component/Footer";
import Button from "../../component/Button";
import styled from "styled-components";
import FlexBox from "../../component/FlexBox";
import { useHistory } from "react-router-dom";
import Bg from "../../images/BG.jpg";
import ScrollHint from "./ScrollHint";
import MainInfos from "./mainInfo/MainInfos";
import MoreInfoBanner from "./mainInfo/MoreInfoBanner";
import useRWD, { useRWDStyleParams } from "../../hooks/useRWD";
import PageContainer from "../../component/PageContainer";
import screenEnum from "../../constant/screenEnum";
import styleParams from "../../constant/styleParams";

const Container = styled(PageContainer)`
  width: 100%;
  overflow: visible;
`;

const FullHeightContent = styled(({ paddingLeft, isSmScreen, ...rest }) => (
  <FlexBox {...rest} />
))`
  background-image: url("${Bg}");
  background-position: left;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  color: #fff;
  font-size: ${({ isSmScreen }) => (isSmScreen ? "16px" : "20px")};
  height: 100%;
  position: relative;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  max-width: 288px;
  height: 60px;
  font-size: 20px;
  margin-top: 20px;

  background-color: rgba(138, 138, 138, 0.6);
  color: #fff;

  &:hover {
    background-color: rgba(138, 138, 138, 0.6);
    color: ${styleParams.mainColor};
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${({ isSmScreen }) => (isSmScreen ? "32px" : "40px")};
`;

function Home() {
  const history = useHistory();
  const { mainPadding } = useRWDStyleParams();
  const { screen } = useRWD();
  const isSmScreen = useMemo(() => screen <= screenEnum.sm, [screen]);

  return (
    <Container>
      <FullHeightContent
        isSmScreen={isSmScreen}
        justify="center"
        flex
        paddingLeft={mainPadding}
      >
        <Title isSmScreen={isSmScreen}>一起享受單車的美好</Title>
        <FlexBox>
          你知道你家最近的單車道在哪嗎？
          <br /> 路易騎收集了全台灣超過 300 條腳踏車道，
          <br /> 以及 300 個 Youbike 站點，透過簡單的規劃，
          <br /> 就能找到最適合你的路線，讓我們一起輕鬆上路。
        </FlexBox>
        <StyledButton type="primary" onClick={() => history.push("/plan")}>
          規劃路線
        </StyledButton>
        <ScrollHint />
      </FullHeightContent>
      <MainInfos />
      <MoreInfoBanner />

      <Footer />
    </Container>
  );
}

Home.propTypes = {};

export default Home;
