import React, { useMemo, useState } from "react";
// import PropTypes from "prop-types";
import DarkPad from "../../component/DarkPad";
import StopSelectorTab from "./stopSelectorTab/StopSeletorTab";
import RouteSelectorTab from "./routeSelectorTab/RouteSelectorTab";
import PageContainer from "../../component/PageContainer";
import Toolbar from "../../component/Toolbar";
import RadioGroup from "../../component/RadioGroup";
import { ReactComponent as Route } from "../../images/icon/Route.svg";
import { ReactComponent as Youbike } from "../../images/icon/Youbike.svg";

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
    <PageContainer flex>
      <Toolbar>
        <RadioGroup
          onChange={setCurMode}
          items={[
            {
              value: "stop",
              icon: <Youbike />,
              label: <span>Youbike 站點</span>,
            },
            {
              value: "route",
              icon: <Route />,
              label: <span>自行車路線</span>,
            },
          ]}
        />
      </Toolbar>
      <DarkPad flex>{mainBlock}</DarkPad>
    </PageContainer>
  );
}

PlanPage.propTypes = {};

export default PlanPage;
