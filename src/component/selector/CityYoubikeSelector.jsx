import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import CitySelector from "./CitySelector";
import FlexBox from "../FlexBox";
import { cityEnum } from "../../constant/cityList";
import youbikeList from "../../constant/youbikeList";
import styled from "styled-components";

const Container = styled(FlexBox)`
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

function CityYoubikeSelector({
  cityVal,
  onCityChange,
  youbikeVal,
  onYoubikeChange,
}) {
  const [options, setOptions] = useState(youbikeList);

  const handleCityChange = useCallback(
    (val) => {
      onCityChange(val);

      switch (val) {
        case cityEnum.tpe.value:
        case cityEnum.nwt.value:
        case cityEnum.txg.value:
          if (!youbikeVal) onYoubikeChange(1);
          setOptions(youbikeList);
          break;
        case cityEnum.tyn.value:
        case cityEnum.hsz.value:
        case cityEnum.zmi.value:
          if (youbikeVal === 2 || !youbikeVal) onYoubikeChange(1);
          setOptions(youbikeList.filter((item) => item.value === 1));
          break;
        case cityEnum.cyi.value:
        case cityEnum.khh.value:
          if (youbikeVal === 1 || !youbikeVal) onYoubikeChange(2);
          setOptions(youbikeList.filter((item) => item.value === 2));
          break;
        default:
          onYoubikeChange(undefined);
          setOptions([]);
      }
    },
    [youbikeVal, onYoubikeChange, onCityChange]
  );

  return (
    <Container row>
      <CitySelector onSelect={handleCityChange} value={cityVal} />
      {options.length !== 0 && (
        <Select
          disabled={options.length === 1}
          value={youbikeVal}
          onSelect={onYoubikeChange}
          options={options}
        />
      )}
    </Container>
  );
}

CityYoubikeSelector.defaultProps = {
  cityVal: undefined,
  onCityChange: () => {},
  youbikeVal: undefined,
  onYoubikeChange: () => {},
};

CityYoubikeSelector.propTypes = {
  cityVal: PropTypes.string,
  onCityChange: PropTypes.func,
  youbikeVal: PropTypes.number,
  onYoubikeChange: PropTypes.func,
};

export default CityYoubikeSelector;
