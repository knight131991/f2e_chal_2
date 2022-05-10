import React from "react";
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
import { useRWDStyleParams } from "../../hooks/useRWD";
import PageContainer from "../../component/PageContainer";

const Container = styled(PageContainer)`
  width: 100%;
  overflow: visible;
`;

const FullHeightContent = styled(({ paddingLeft, ...rest }) => (
  <FlexBox {...rest} />
))`
  background-image: url("${Bg}");
  background-position: left;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  color: #fff;
  font-size: 20px;
  gap: 16px;
  height: 100%;
  position: relative;
`;

const StyledButton = styled(Button)`
  max-width: 288px;
  height: 60px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 40px;
`;

function Home() {
  const history = useHistory();
  const { mainPadding } = useRWDStyleParams();

  return (
    <Container>
      <FullHeightContent justify="center" flex paddingLeft={mainPadding}>
        <Title>一起享受單車的美好</Title>
        <FlexBox>
          你知道你家最近的單車道在哪嗎？
          <br /> 路易騎收集了全台灣超過 300 條腳踏車道，
          <br /> 以及 300 個 Youbike 站點，透過簡單的規劃，
          <br /> 就能找到最適合你的路線，讓我們一起輕鬆上路。
        </FlexBox>
        <StyledButton onClick={() => history.push("/plan")}>
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
