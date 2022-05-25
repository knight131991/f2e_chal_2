import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import CitySelector from "./CitySelector";
import FlexBox from "../FlexBox";
import { cityEnum } from "../../constant/cityList";
import youbikeList from "../../constant/youbikeList";
import styled from "styled-components";

const cityTypeSwitch = (city, type1CB, type2CB, type3CB, defaultCB) => {
  switch (city) {
    case cityEnum.tpe.value:
    case cityEnum.nwt.value:
    case cityEnum.txg.value:
      type1CB();
      break;
    case cityEnum.tyn.value:
    case cityEnum.hsz.value:
    case cityEnum.zmi.value:
      type2CB();
      break;
    case cityEnum.cyi.value:
    case cityEnum.khh.value:
      type3CB();
      break;
    default:
      defaultCB();
  }
};

export const getDefaultYoubikeVerByCity = (city) => {
  let result = 1;
  cityTypeSwitch(
    city,
    () => (result = 1),
    () => (result = 1),
    () => (result = 2),
    () => (result = 1)
  );
  return result;
};

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


  /* 此useCallback與下方的useEffect做的事情很類似，但不能把他們合併，主要是因為
      1. options是在此元件內的state，所以此元件re-mount的時候options的狀態就會重置，所以每次mount此元件時，就要用useEffect來重新取得正確的options
      2. onYoubikeChange不能寫在useEffect中，因為觸發取得站點api的條件是判斷city, youbikever是否變動。所以如果把onYoubikeChange寫在useEffect內，
         流程就會變成 onCityChange -> fetch api, onYoubikeChange -> fetch api 這樣api就會被呼叫兩次，如果寫在此處的useCallback，流程就會是
         onCityChange, onYoubikeChange -> fetch api，這樣就只會打一次api */
  const handleCityChange = useCallback(
    (val) => {
      onCityChange(val);
      cityTypeSwitch(
        val,
        () => !youbikeVal && onYoubikeChange(1),
        () => (youbikeVal === 2 || !youbikeVal) && onYoubikeChange(1),
        () => (youbikeVal === 1 || !youbikeVal) && onYoubikeChange(2),
        () => onYoubikeChange()
      );
    },
    [onCityChange, onYoubikeChange, youbikeVal]
  );

  useEffect(() => {
    cityTypeSwitch(
      cityVal,
      () => setOptions(youbikeList),
      () => setOptions(youbikeList.filter((item) => item.value === 1)),
      () => setOptions(youbikeList.filter((item) => item.value === 2)),
      () => setOptions([])
    );
  }, [cityVal, onYoubikeChange, youbikeVal]);

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
