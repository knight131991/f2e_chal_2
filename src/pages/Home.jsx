import React from "react";
// import PropTypes from "prop-types";
import Button from "../component/Button";
import styled from "styled-components";
import FlexBox from "../component/FlexBox";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Home() {
  const history = useHistory();

  return (
    <Container>
      <FlexBox>
        <FlexBox>YouBike, YouRoad</FlexBox>
        <FlexBox>
          近年來因應健康、環保等開啟了騎自行車風潮，我們整理了各縣市的自行車路線，結合
          Youbike 讓您快速規劃您的活動。
        </FlexBox>
        <Button onClick={() => history.push('/plan')}>規劃路線</Button>
      </FlexBox>
    </Container>
  );
}

Home.propTypes = {};

export default Home;
