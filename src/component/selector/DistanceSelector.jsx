import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import AntSelect from "antd/lib/select";

function DistanceSelector({ value, onSelect, prefixStr, filterName, ...rest }) {
  const { Option } = AntSelect;
  const options = useMemo(
    () => [
      { value: "", label: "不拘" },
      { value: `${filterName} le 1000`, label: "1公里以內" },
      {
        value: `${filterName} ge 3000 and ${filterName} le 5000`,
        label: "3-5公里",
      },
      {
        value: `${filterName} ge 6000 and ${filterName} le 10000`,
        label: "6-10公里",
      },
      { value: `${filterName} ge 10000`, label: "10公里以上" },
    ],
    [filterName]
  );
  return (
    <Select value={value} onSelect={onSelect} optionLabelProp="label" {...rest}>
      {options.map(({ value, label }) => (
        <Option key={value} value={value} label={`${prefixStr}${label}`}>
          {label}
        </Option>
      ))}
    </Select>
  );
}

DistanceSelector.propTypes = {
  value: undefined,
  onSelect: () => {},
  prefixStr: "",
};
DistanceSelector.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func,
  prefixStr: PropTypes.string,
  filterName: PropTypes.string,
};

export default DistanceSelector;
