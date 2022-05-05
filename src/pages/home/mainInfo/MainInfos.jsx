import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";
import OperationFlow from "./operationFlow/OperationFlow";
import PicandDescBlock from "./PicandDescBlock";

const Container = styled(FlexBox)`
  padding 80px 8px 0;
`;

function MainInfos(props) {
  return (
    <Container flex align="center">
      <div>展開你的單車之旅</div>
      <FlexBox>
        <OperationFlow />
        <FlexBox align="center">一起享受單車的美好！</FlexBox>
        <PicandDescBlock />
      </FlexBox>
    </Container>
  );
}

MainInfos.propTypes = {};

export default MainInfos;
