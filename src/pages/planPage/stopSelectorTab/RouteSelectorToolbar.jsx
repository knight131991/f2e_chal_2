import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import FlexBox from "../../../component/FlexBox";
import DistanceSelector from "../../../component/selector/DistanceSelector";
import CheckboxGroup from "../../../component/CheckboxGroup";
import Search from "../../../component/Search";
import Divider from "../../../component/toolbar/Divider";
import { directionList } from "../../../constant/directionEnum";

function RouteSelectorToolbar({
  routeLen,
  onRouteChange,
  onDireactChange,
  onSearch,
  onSearchChange,
  searchKey,
  render,
}) {
  const selectors = useMemo(
    () => (
      <FlexBox row align="center">
        <DistanceSelector
          placeholder="車道長度"
          value={routeLen}
          onSelect={onRouteChange}
          prefixStr="車道長度： "
          filterName="CyclingLength"
        />
        <Divider />
        <CheckboxGroup options={directionList} onChange={onDireactChange} />
      </FlexBox>
    ),
    [routeLen, onRouteChange, onDireactChange]
  );

  const search = useMemo(
    () => (
      <Search
      onChange={onSearchChange}
        value={searchKey}
        placeholder="路線 / 起、迄點搜尋"
        onPressEnter={onSearch}
      />
    ),
    [onSearch, searchKey, onSearchChange]
  );
  return render ? (
    render(selectors, search)
  ) : (
    <FlexBox flex row justify="space-between" align="center">
      {selectors}
      {search}
    </FlexBox>
  );
}

RouteSelectorToolbar.propTypes = {};

export default RouteSelectorToolbar;
