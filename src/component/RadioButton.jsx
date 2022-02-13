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
  justify-content: center;
  border-color: #5368f0;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  
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

  &.ant-radio-button-wrapper:first-child {
    border-radius: 8px 0px 0px 8px;
    border-color: #5368f0;
  }

  &.ant-radio-button-wrapper:last-child {
    border-radius: 0px 8px 8px 0px;
  }
`;
