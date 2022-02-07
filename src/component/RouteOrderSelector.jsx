import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

export const routeOrders = {
  distance: "distance",
  length: "length",
  hot: "hot",
};

export function useOrderChange() {
  const [sortBy, setSortBy] = useState(routeOrders.distance);

  const handleSorterChange = useCallback((val) => {
    if (val === routeOrders.distance) {
      setSortBy("Distance");
    } else if (val === routeOrders.length) {
      setSortBy("CyclingLength");
    } else {
      console.log("非預期的排序值");
    }
  }, []);
  return { sortBy, handleSorterChange };
}

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
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
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
