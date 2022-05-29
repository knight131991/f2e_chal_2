import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../component/FlexBox";
import CityYoubikeSelector from "../../component/selector/CityYoubikeSelector";
import Search from "../../component/Search";
import styled from "styled-components";

const StyledSearch = styled(Search)`
  margin-left: 8px;
`;

function ToolbarComponent({
  city,
  onCityChange,
  youbikeVer,
  onYoubikeChange,
  searchKey,
  onSearch,
  onSearchChange,
  render,
}) {
  const selector = useMemo(
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

  const search = useMemo(
    () => (
      <StyledSearch
        value={searchKey}
        onPressEnter={onSearch}
        onChange={onSearchChange}
        placeholder="站點搜尋"
      />
    ),
    [searchKey, onSearch, onSearchChange]
  );
  return render ? (
    render(selector, search)
  ) : (
    <FlexBox flex row justify="space-between">
      {selector}
      {search}
    </FlexBox>
  );
}

ToolbarComponent.propTypes = {};

export default ToolbarComponent;
