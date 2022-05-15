import React from "react";
// import PropTypes from "prop-types";
import { Select as AntSelect } from "antd";
import styled from "styled-components";
import styleParams from "../constant/styleParams";
import { ReactComponent as Down } from "../images/icon/Down.svg";

const SuffixIcon = styled(Down)`
  transform: translate(-11px, -25%);
  color: #616161;

  &:hover {
    color: ${styleParams.mainColor};
  }
`;

const StyledDropdown = styled(({ component, ...rest }) => (
  <div {...rest}>{component}</div>
))`
  & .ant-select-item {
    color: #616161;
    font-size: 16px;

    &.ant-select-item-option-selected {
      color: ${styleParams.mainColor};
      background: none;
    }

    &.ant-select-item-option-active {
      color: ${styleParams.mainColor};
      background-color: #eff6ed;
    }
  }
`;

export default styled(({ ...rest }) => (
  <AntSelect
    dropdownStyle={{
      border: `1px solid ${styleParams.mainColorDark}`,
      borderRadius: "8px",
    }}
    dropdownRender={(origin) => <StyledDropdown component={origin} />}
    suffixIcon={
      <span className="test">
        <SuffixIcon />
      </span>
    }
    {...rest}
  />
))`
  min-width: 170px;
  font-size: 16px;
  color: #616161;

  &:not(.ant-select-customize-input) {
    &.ant-select-focused:not(.ant-select-disabled) .ant-select-selector {
      box-shadow: none;
      border-color: ${styleParams.mainColorDark};
    }

    & .ant-select-selector {
      border-radius: 100px;
      padding: 0 16px;
      border-color: #616161;
      transition: none;
    }
  }

  &:not(.ant-select-customize-input).ant-select-focused:not(.ant-select-disabled)
    .ant-select-selector {
    box-shadow: none;
    border-color: ${styleParams.mainColorDark};
  }

  &:not(.ant-select-disabled):hover {
    & .ant-select-selector {
      border-color: ${styleParams.mainColorDark};
      color: ${styleParams.mainColor};
    }

    & .ant-select-arrow {
      svg {
        color: ${styleParams.mainColor};
      }
    }
  }

  & .ant-select-selector {
    min-height: 46px;

    & > .ant-select-selection-item {
      display: flex;
      align-items: center;
      transition: none;
    }
  }

  & .ant-select-arrow {
    right: 16px;
  }
`;
