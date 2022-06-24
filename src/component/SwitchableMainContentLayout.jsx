import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import styled from "styled-components";
import FlexSpin from "./FlexSpin";
import { useRWDStyleParams } from "../hooks/useRWD";
import styleParams from "../constant/styleParams";
import { ReactComponent as Map } from "../images/icon/White_Map.svg";
import { ReactComponent as List } from "../images/icon/White_List.svg";

const Container = styled(FlexBox)`
  height: 100%;
`;

const SubContainer = styled(({ fullWidth, hide, ...rest }) => (
  <FlexBox noShrink {...rest} />
))`
  height: 100%;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "50%")};
  ${({ hide }) => hide && "display: none !important;"}
`;

const LeftSideWrapper = styled(({ paddingLeft, ...rest }) => (
  <SubContainer {...rest} />
))`
  padding: 26px 26px 0 ${({ paddingLeft }) => paddingLeft};
`;

const StyledSpin = styled(({ showRightSide, ...rest }) => (
  <FlexSpin {...rest} />
))`
  overflow: hidden;

  & .ant-spin-container {
    transition: margin 0.3s;
    margin-left: ${(props) => (props.showRightSide ? "-100%" : 0)};
  }
`;

const StyledBtn = styled((props) => <FlexBox row align="center" {...props} />)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${styleParams.mainColorDark};
  padding: 8px 16px;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

function SwitchableMainContentLayout({
  leftContent,
  rightContent,
  loading,
  switchMode,
  hideBtn,
}) {
  const { mainPadding } = useRWDStyleParams();
  const [showRightSide, setShowRightSide] = useState();
  const { btnText, btnIcon } = useMemo(() => {
    if (showRightSide) {
      return { btnText: "顯示列表", btnIcon: <List /> };
    }
    return { btnText: "顯示地圖", btnIcon: <Map /> };
  }, [showRightSide]);

  useEffect(() => {
    if (!switchMode) setShowRightSide(false);
  }, [switchMode]);

  return (
    <Container row flex>
      <StyledSpin spinning={loading} showRightSide={showRightSide}>
        <LeftSideWrapper fullWidth={switchMode} paddingLeft={mainPadding}>
          {leftContent}
        </LeftSideWrapper>
        <SubContainer fullWidth={switchMode}>{rightContent}</SubContainer>
      </StyledSpin>
      {switchMode && !hideBtn && (
        <StyledBtn onClick={() => setShowRightSide(!showRightSide)}>
          {btnIcon}
          <span>{btnText}</span>
        </StyledBtn>
      )}
    </Container>
  );
}

SwitchableMainContentLayout.defaultProps = {
  leftContent: null,
  rightContent: null,
  loading: false,
  switchMode: false,
  hideBtn: false,
  // switchBtnIcon: null,
  // switchBtnText: "切換",
};
SwitchableMainContentLayout.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
  loading: PropTypes.bool,
  switchMode: PropTypes.bool,
  hideBtn: PropTypes.bool,
  // switchBtnIcon: PropTypes.node,
  // switchBtnText: PropTypes.string,
};

export default SwitchableMainContentLayout;
