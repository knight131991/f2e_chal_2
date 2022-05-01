import React from "react";
// import PropTypes from "prop-types";
import Button from "../component/Button";
import styled from "styled-components";
import FlexBox from "../component/FlexBox";
import { useHistory } from "react-router-dom";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const SubContainer = styled(FlexBox)`
  padding-bottom: 138px;

  & > .homePage__title {
    font-size: 48px;
    foint-weight: bold;
  }
`;

const Content = styled(FlexBox)`
  max-width: 580px;
  font-size: 20px;
  margin-bottom: 32px;
`;

const StyledBtn = styled(Button)`
  min-height: 62px;
  max-width: 288px;
  font-size: 20px;
`;

function Home() {
  const history = useHistory();

  return (
    <Container>
      <SubContainer justify="flex-end" flex>
        <FlexBox className="homePage__title">YouBike, YouRoad</FlexBox>
        <Content>
          近年來因應健康、環保等開啟了騎自行車風潮，我們整理了各縣市的自行車路線，結合
          Youbike 讓您快速規劃您的活動。
        </Content>
        <StyledBtn onClick={() => history.push("/plan")}>規劃路線</StyledBtn>
      </SubContainer>
    </Container>
  );
}

Home.propTypes = {};

export default Home;
