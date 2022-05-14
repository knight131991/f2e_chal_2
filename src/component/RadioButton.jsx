import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Radio } from "antd";
import styleParams from "../constant/styleParams";

function RadioButton(props) {
  return <Radio.Button {...props} />;
}

RadioButton.propTypes = {};

export default styled(RadioButton)`
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  font-weight: bold;
  color: #9e9e9e;

  &:before: {
    content: none;
  }

  &:focus-within {
    box-shadow: none;
  }

  &:hover {
    color: ${styleParams.mainColor};
  }

  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border: 1px solid ${styleParams.mainColor};
    background: ${styleParams.bg};
    color: ${styleParams.mainColor};

    &:hover {
      background-color: ${styleParams.bg};
      color: ${styleParams.mainColor};
      border-color: ${styleParams.mainColor};
    }

    &:focus-within {
      box-shadow: none;
    }
  }

  & > span {
    display: flex;
    flex-direction: row;

    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
`;
