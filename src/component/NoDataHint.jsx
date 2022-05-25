import React from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";

function NoDataHint({ text }) {
  return (
    <FlexBox justify="center" align="center">
      {text}
    </FlexBox>
  );
}

NoDataHint.defaultProps = { text: "沒有尋找到相關路線" };
NoDataHint.propTypes = { text: PropTypes.string };

export default NoDataHint;
