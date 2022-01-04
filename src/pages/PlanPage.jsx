import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Radio, Checkbox, Select, Input } from "antd";
import FlexBox from "../component/FlexBox";
import DarkPad from "../component/DarkPad";
import InfoCard from "../component/InfoCard";
import GMap from "../component/GMap";
import useGetBikeStopInfo from "../hooks/useGetBikeStopInfo";
import RadioButton from "../component/RadioButton";

function PlanPage(props) {
  const { getBikeStopInfo, data, loading } = useGetBikeStopInfo();

  useEffect(() => {
    getBikeStopInfo();
  }, [getBikeStopInfo]);

  return (
    <FlexBox flex>
      <Radio.Group buttonStyle="solid" defaultValue="spot">
        <RadioButton value="spot">先選擇 Youbike 站點</RadioButton>
        <RadioButton value="route">先選擇自行車路線</RadioButton>
      </Radio.Group>
      <DarkPad>
        <FlexBox row>
          捷運關渡站站點
          <FlexBox row>
            <Checkbox value="unidireaction" >單向</Checkbox>
            <Checkbox value="bilateral" >雙向</Checkbox>
          </FlexBox>
          <Select>
            <Select.Option>由進到遠</Select.Option>
            <Select.Option>熱門</Select.Option>
          </Select>
          <Input />
        </FlexBox>
        共3條路線
        <FlexBox row>
          <InfoCard
            title="金色水岸自行車道"
            btnName="挑戰此路線"
            content={
              <>
                <span> 車道長度：10 公里</span>
                <span> 起點 - 終點</span>
                <span> 鄰近起點：? 公里</span>
              </>
            }
          />
          <GMap />
        </FlexBox>
        <FlexBox align="flex-end">重新選擇站點</FlexBox>
      </DarkPad>
    </FlexBox>
  );
}

PlanPage.propTypes = {};

export default PlanPage;
