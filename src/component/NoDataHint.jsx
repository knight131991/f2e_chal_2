import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "./FlexBox";

function NoDataHint() {
  return (
    <FlexBox justify="center" align="center">
      沒有尋找到相關路線
    </FlexBox>
  );
}

NoDataHint.propTypes = {};

export default NoDataHint;
