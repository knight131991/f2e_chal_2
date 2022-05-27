import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Divider from "../toolbar/Divider";
import CitySelector from "../selector/CitySelector";
import DistanceSelector from "../selector/DistanceSelector";
import CheckboxGroup from "../CheckboxGroup";
import { directionList } from "../../constant/directionEnum";
import Search from "../Search";
import FlexBox from "../FlexBox";
import styled from "styled-components";

const SelectorsContainer = styled(FlexBox)`
  .ant-select + .ant-select {
    margin-left: 8px;
  }
`;

const StyledSearch = styled(({ marginLeft, ...rest }) => <Search {...rest} />)`
  ${({ marginLeft }) => marginLeft && "margin-left: 8px;"}
`;

function RouteSelectorToolbar({
  city,
  routeLen,
  onCityChange,
  onRouteLenChange,
  onDireactChange,
  onSearch,
  searchKey,
  searchMarginLeft,
  render,
}) {
  const selectors = useMemo(
    () => (
      <SelectorsContainer row align="center">
        <CitySelector value={city} onSelect={onCityChange} />
        <DistanceSelector
          value={routeLen}
          onSelect={onRouteLenChange}
          placeholder="車道長度"
          prefixStr="車道長度： "
          filterName="CyclingLength"
        />
      </SelectorsContainer>
    ),
    [city, onCityChange, routeLen, onRouteLenChange]
  );

  const checkboxGroup = useMemo(
    () => <CheckboxGroup options={directionList} onChange={onDireactChange} />,
    [onDireactChange]
  );

  const search = useMemo(
    () => (
      <StyledSearch
        value={searchKey}
        placeholder="路線 / 起、迄點搜尋"
        onPressEnter={onSearch}
        marginLeft={searchMarginLeft}
      />
    ),
    [onSearch, searchKey, searchMarginLeft]
  );

  const wholeComponent = useMemo(
    () => (
      <FlexBox row justify="space-between" align="center" flex>
        <FlexBox row align="center">
          {selectors}
          <Divider />
          {checkboxGroup}
        </FlexBox>
        {search}
      </FlexBox>
    ),
    [search, selectors, checkboxGroup]
  );

  return render ? (
    render(wholeComponent, selectors, checkboxGroup, search)
  ) : (
    <>
      <Divider />
      {wholeComponent}
    </>
  );
}

RouteSelectorToolbar.propTypes = { render: undefined };
RouteSelectorToolbar.propTypes = { render: PropTypes.func };

export default RouteSelectorToolbar;
