import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import CityYoubikeSelector from "../../../component/selector/CityYoubikeSelector";
import Search from "../../../component/Search";
import styled from "styled-components";

const StyledSearch = styled(Search)`
  margin-left: 8px;
`;

function StopSelectorToolbar({
  city,
  onCityChange,
  onYoubikeChange,
  youbikeVer,
  onSearch,
  searchKey,
}) {
  return (
    <FlexBox row justify="space-between" flex align="center">
      <CityYoubikeSelector
        cityVal={city}
        onCityChange={onCityChange}
        onYoubikeChange={onYoubikeChange}
        youbikeVal={youbikeVer}
      />
      <StyledSearch
        value={searchKey}
        placeholder="站點搜尋"
        onPressEnter={onSearch}
      />
    </FlexBox>
  );
}

StopSelectorToolbar.propTypes = {};

export default StopSelectorToolbar;
