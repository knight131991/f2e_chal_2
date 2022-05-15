import React from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import cityList from "../constant/cityList";
function CitySelector({ value, onSelect }) {
  return (
    <Select
      value={value}
      onSelect={onSelect}
      options={cityList.map(({ label, value }) => ({ label, value }))}
    />
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
