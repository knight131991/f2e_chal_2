import React from "react";
import PropTypes from "prop-types";
import RadioGroup from "../../component/RadioGroup";
import { ReactComponent as Route } from "../../images/icon/Route.svg";
import { ReactComponent as Youbike } from "../../images/icon/Youbike.svg";

function ModeSelector({ onChange, value }) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
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
  );
}

ModeSelector.defaultProps = { onChange: () => {}, value: "stop" };
ModeSelector.propTypes = { onChange: PropTypes.func, value: PropTypes.string };

export default ModeSelector;
