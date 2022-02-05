import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../component/FlexBox";
import DarkPad from "../component/DarkPad";
import CitySelector from "../component/CitySelector";
import { Input, Radio } from "antd";
import RadioButton from "../component/RadioButton";
import cityList from "../constant/cityList";
import GMap from "../component/gMap/GMap";

function BikeSpot(props) {
  return (
    <FlexBox flex>
      Youbike地圖
      <DarkPad flex>
        <FlexBox row>
          <CitySelector value={cityList[0].value}/>
          <Radio.Group
            buttonStyle="solid"
            defaultValue="bike"
            onChange={(e) => console.log(e.target.value)}
          >
            <RadioButton value="bike">找單車</RadioButton>
            <RadioButton value="park">找車位</RadioButton>
          </Radio.Group>
          <Input.Search />
        </FlexBox>
        <GMap/>
      </DarkPad>
    </FlexBox>
  );
}

BikeSpot.propTypes = {};

export default BikeSpot;
