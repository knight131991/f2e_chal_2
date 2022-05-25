import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import AntSelect from "antd/lib/select";

function DistanceSelector({ value, onSelect, prefixStr, ...rest }) {
  const { Option } = AntSelect;
  const options = useMemo(
    () => [
      { value: "", label: "不拘" },
      { value: "100", label: "100公尺以內" },
      {
        value: "200",
        label: "200公尺以內",
      },
      {
        value: "500",
        label: "500公尺以內",
      },
      { value: "1000", label: "1公里以內" },
    ],
    []
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
};

export default DistanceSelector;
