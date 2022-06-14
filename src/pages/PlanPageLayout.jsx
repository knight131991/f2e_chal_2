import React from "react";
import PropTypes from "prop-types";
import Toolbar from "../component/toolbar/Toolbar";
import ModeSelector from "./planPage/ModeSelector";
import CollapsibleToolbarLayout from "../component/toolbar/CollapsibleToolbarLayout";

function PlanPageLayout({
  onModeChange,
  toolbarComponent,
  secondToolbar,
  offsetTop,
  mainComponent,
  curMode,
}) {
  return (
    <CollapsibleToolbarLayout
      toolbar={
        <>
          <Toolbar>
            <ModeSelector value={curMode} onChange={onModeChange} />
            {toolbarComponent}
          </Toolbar>
          {secondToolbar}
        </>
      }
      content={mainComponent}
      contentOffset={offsetTop}
    />
  );
}

PlanPageLayout.defaultProps = {
  onModeChange: () => {},
  toolbarComponent: null,
  secondToolbar: null,
  offsetTop: 0,
  mainComponent: null,
  curMode: undefined,
};

PlanPageLayout.propTypes = {
  onModeChange: PropTypes.func,
  toolbarComponent: PropTypes.node,
  secondToolbar: PropTypes.node,
  offsetTop: PropTypes.number,
  mainComponent: PropTypes.node,
  curMode: PropTypes.string,
};

export default PlanPageLayout;
