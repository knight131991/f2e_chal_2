import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

export const routeOrders = {
  distance: "distance",
  length: "length",
  hot: "hot",
};

function RouteOrderSelector({ onChange }) {
  const routeOrders = useMemo(
    () => [
      { value: "distance", label: "由進到遠" },
      { value: "length", label: "車道長度" },
    //   { value: "hot", label: "熱門" },
    ],
    []
  );

  return (
    <Select defaultValue={routeOrders[0].value} onChange={onChange}>
      {routeOrders.map(({ value, label }) => (
        <Select.Option key={value} value={value}>{label}</Select.Option>
      ))}
    </Select>
  );
}

RouteOrderSelector.defaultProps = {
  onChange: () => {},
};
RouteOrderSelector.propTypes = {
  onChange: PropTypes.func,
};

export default RouteOrderSelector;
