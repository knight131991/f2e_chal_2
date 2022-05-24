import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import Divider from "../../../component/toolbar/Divider";
import CityYoubikeSelector from "../../../component/selector/CityYoubikeSelector";
import Select from "../../../component/selector/Select";
import FlexBox from "../../../component/FlexBox";
import Search from "../../../component/Search";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin-right: 8px;
`;

function StopSelectorToolbar({
  city,
  onCityChange,
  youbikeVer,
  onYoubikeChange,
  onSearch,
  render,
}) {
  const cityYoubikeSelect = useMemo(
    () => (
      <CityYoubikeSelector
        cityVal={city}
        onCityChange={onCityChange}
        youbikeVal={youbikeVer}
        onYoubikeChange={onYoubikeChange}
      />
    ),
    [city, onCityChange, youbikeVer, onYoubikeChange]
  );

  const distanceSelect = useMemo(() => <StyledSelect />, []);
  const search = useMemo(
    () => <Search placeholder="站點搜尋" onPressEnter={onSearch} />,
    [onSearch]
  );

  const wholeComponent = useMemo(
    () => (
      <FlexBox justify="space-between" row flex>
        <FlexBox row>
          {cityYoubikeSelect}
          <Divider />
          {distanceSelect}
        </FlexBox>
        {search}
      </FlexBox>
    ),
    [cityYoubikeSelect, distanceSelect, search]
  );

  return render
    ? render(wholeComponent, cityYoubikeSelect, distanceSelect, search)
    : wholeComponent;
}

StopSelectorToolbar.propTypes = {};

export default StopSelectorToolbar;
