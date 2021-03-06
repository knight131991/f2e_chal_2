import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import cityList from "../constant/cityList";

function CitySelector({ value, onSelect }) {
  return (
    <Select value={value} onSelect={onSelect}>
      {cityList.map(({ label, value }) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
}

CitySelector.defaultProps = {
  value: undefined,
  onSelect: () => {},
};
CitySelector.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func,
};

export default CitySelector;
