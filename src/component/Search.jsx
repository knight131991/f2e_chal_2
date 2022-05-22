import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";
import { ReactComponent as SearchIcon } from "../images/icon/Search.svg";

export default styled(({ onPressEnter, ...rest }) => (
  <Input
    allowClear
    prefix={<SearchIcon />}
    onChange={(e) => onPressEnter(e.target.value)}
    {...rest}
  />
))`
  max-width: 277px;
  min-height: 48px;
  font-size: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  border: none;

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-focused {
    border: none;
    box-shadow: none;
  }
  & input {
    background: #f5f5f5;
  }
`;
