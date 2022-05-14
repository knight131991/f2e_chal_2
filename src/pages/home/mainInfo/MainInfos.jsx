import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";
import OperationFlow from "./operationFlow/OperationFlow";
import PicandDescBlock from "./PicandDescBlock";
import styleParams from "../../../constant/styleParams";

const Container = styled(FlexBox)`
  padding 80px 8px 0px;
`;

const PictureTextContainer = styled(FlexBox)`
  background-color: ${styleParams.bg};
  margin-top: 120px;
  padding-bottom: 206px;
`;

const Title = styled(({ paddingTop, paddingBottom, ...rest }) => (
  <FlexBox {...rest} />
))`
  font-size: 32px;
  font-weight: bold;
  padding-top: ${({ paddingTop }) => paddingTop};
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

function MainInfos(props) {
  return (
    <Container flex align="center">
      <Title paddingBottom="100px">展開你的單車之旅</Title>
      <FlexBox>
        <OperationFlow />
        <PictureTextContainer>
          <Title align="center" paddingTop="80px" paddingBottom="32px">
            一起享受單車的美好！
          </Title>
          <PicandDescBlock />
        </PictureTextContainer>
      </FlexBox>
    </Container>
  );
}

MainInfos.propTypes = {};

export default MainInfos;
