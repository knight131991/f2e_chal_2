import React, { useMemo, useState } from "react";
// import PropTypes from "prop-types";
import { Radio } from "antd";
import FlexBox from "../../component/FlexBox";
import DarkPad from "../../component/DarkPad";
import RadioButton from "../../component/RadioButton";
import StopSelectorTab from "./stopSelectorTab/StopSeletorTab";
import RouteSelectorTab from "./routeSelectorTab/RouteSelectorTab";
import styled from "styled-components";

const StyledRBtn = styled(RadioButton)`
  width: 248px;
  height: 62px;
  font-size: 20px;
  margin-bottom: 24px;
`;

function PlanPage(props) {
  const [curMode, setCurMode] = useState("stop");

  const mainBlock = useMemo(() => {
    let component = null;
    switch (curMode) {
      case "stop":
        component = <StopSelectorTab />;
        break;
      case "route":
        component = <RouteSelectorTab />;
        break;
      default:
        break;
    }
    return component;
  }, [curMode]);

  return (
    <FlexBox flex>
      <Radio.Group
        buttonStyle="solid"
        defaultValue="stop"
        onChange={(e) => setCurMode(e.target.value)}
      >
        <StyledRBtn value="stop">先選擇 Youbike 站點</StyledRBtn>
        <StyledRBtn value="route">先選擇自行車路線</StyledRBtn>
      </Radio.Group>
      <DarkPad flex>{mainBlock}</DarkPad>
    </FlexBox>
  );
}

PlanPage.propTypes = {};

export default PlanPage;
