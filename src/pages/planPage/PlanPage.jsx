import React, { useMemo, useState } from "react";
// import PropTypes from "prop-types";
import StopSelectorTab from "./stopSelectorTab/StopSeletorTab";
import RouteSelectorTab from "./routeSelectorTab/RouteSelectorTab";
import PageContainer from "../../component/PageContainer";

function PlanPage(props) {
  const [curMode, setCurMode] = useState("stop");

  const mainBlock = useMemo(() => {
    let component = null;
    switch (curMode) {
      case "stop":
        component = <StopSelectorTab onModeChange={setCurMode} />;
        break;
      case "route":
        component = <RouteSelectorTab />;
        break;
      default:
        break;
    }
    return component;
  }, [curMode]);

  return <PageContainer>{mainBlock}</PageContainer>;
}

PlanPage.propTypes = {};

export default PlanPage;
