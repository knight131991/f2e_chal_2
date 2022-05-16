import React from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import CitySelector from "./selector/CitySelector";
import RouteOrderSelector from "./RouteOrderSelector";
import DirectionCheckBox from "./DirectionCheckBox";

function RouteFilters({
  city,
  onSelectCity,
  onRouterOrderChange,
  onDirectionChange,
}) {
  return (
    <FlexBox row>
      <CitySelector value={city} onSelect={onSelectCity} />
      <RouteOrderSelector onChange={onRouterOrderChange} />
      <DirectionCheckBox onChange={onDirectionChange} />
    </FlexBox>
  );
}

RouteFilters.defaultProps = {
  city: "",
  onSelectCity: () => {},
  onRouterOrderChange: () => {},
  onDirectionChange: () => {},
};
RouteFilters.propTypes = {
  city: PropTypes.string,
  onSelectCity: PropTypes.func,
  onRouterOrderChange: PropTypes.func,
  onDirectionChange: PropTypes.func,
};

export default RouteFilters;
