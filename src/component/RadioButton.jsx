import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Radio } from "antd";

function RadioButton(props) {
  return <Radio.Button {...props} />;
}

RadioButton.propTypes = {};

export default styled(RadioButton)`
  display: inline-flex;
  align-items: center;
  border-color: #5368f0;

  &:focus-within {
    box-shadow: none;
  }

  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background-color: #5368f0;
    border-color: #5368f0;

    &:hover {
      background-color: #5368f0;
      border-color: #5368f0;
    }

    &:focus-within {
      box-shadow: none;
    }
  }
`;
