import React from "react";
// import PropTypes from "prop-types";
import { ReactComponent as ArrowIcon } from "../../../../images/arrow.svg";
import { ReactComponent as Step1Icon } from "../../../../images/icon/Step1.svg";
import { ReactComponent as Step2Icon } from "../../../../images/icon/Step2.svg";
import { ReactComponent as Step3Icon } from "../../../../images/icon/Step3.svg";
import FlexBox from "../../../../component/FlexBox";
import InfoBlock from "./InfoBlock";
import styled from "styled-components";
import useRWD from "../../../../hooks/useRWD";

const Container = styled(FlexBox)`
  padding: 0 48px;
`;

const StyledArrowIcon = styled(({ rotate, margin, ...rest }) => (
  <ArrowIcon {...rest} />
))`
  ${({ rotate }) => rotate && "transform: rotate(90deg);"}
  margin: ${({ margin }) => margin};
  flex-shrink: 0;
`;

function OperationFlow() {
  const { margin, row, rotate } = useRWD(
    { margin: "100px", row: true, rotate: false },
    {
      l: { margin: "56px" },
      m: { margin: "48px" },
      s: { margin: "32px", row: false, rotate: true },
    }
  );

  return (
    <Container row={row} align="center">
      <InfoBlock
        icon={<Step1Icon />}
        order={1}
        title="站點與路線一站式規劃"
        content="我們整合全台灣的路線及 Youbike 站點，讓您快速地完成規劃。"
      />
      <StyledArrowIcon rotate={rotate} margin={margin} />
      <InfoBlock
        icon={<Step2Icon />}
        order={2}
        title="隨時出發"
        content="彈性且快速的流程規劃，讓您隨時可以出發。"
      />
      <StyledArrowIcon rotate={rotate} margin={margin} />
      <InfoBlock
        icon={<Step3Icon />}
        order={3}
        title="取得成就"
        content="除了騎腳踏車的挑戰，我們還提供了其它成就等您挑戰！"
      />
    </Container>
  );
}

OperationFlow.propTypes = {};

export default OperationFlow;