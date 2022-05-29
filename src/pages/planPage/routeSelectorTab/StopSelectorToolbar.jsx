import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import Divider from "../../../component/toolbar/Divider";
import CityYoubikeSelector from "../../../component/selector/CityYoubikeSelector";
import FlexBox from "../../../component/FlexBox";
import Search from "../../../component/Search";
import styled from "styled-components";
import DistToRouteSelector from "../../../component/selector/DistToRouteSelector";

const StyledSelect = styled(DistToRouteSelector)`
  margin-right: 8px;
`;

function StopSelectorToolbar({
  city,
  onCityChange,
  youbikeVer,
  distance,
  onYoubikeChange,
  onDistanceChange,
  onSearch,
  onSearchChange,
  searchKey,
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

  const distanceSelect = useMemo(
    () => (
      <StyledSelect
        value={distance}
        onSelect={onDistanceChange}
        prefixStr="與路線距離："
      />
    ),
    [distance, onDistanceChange]
  );
  const search = useMemo(
    () => (
      <Search
        value={searchKey}
        placeholder="站點搜尋"
        onPressEnter={onSearch}
        onChange={onSearchChange}
      />
    ),
    [onSearch, onSearchChange, searchKey]
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
