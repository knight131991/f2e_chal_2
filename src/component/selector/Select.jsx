import React from "react";
// import PropTypes from "prop-types";
import { Select as AntSelect } from "antd";
import styled from "styled-components";
import styleParams from "../../constant/styleParams";
import { ReactComponent as Down } from "../../images/icon/Down.svg";

const SuffixIcon = styled(({ disabled, ...rest }) => <Down {...rest} />)`
  transform: translate(-11px, -25%);
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.25)" : styleParams.grayText};

  &:hover {
    color: ${styleParams.mainColor};
  }
`;

const StyledDropdown = styled(({ component, ...rest }) => (
  <div {...rest}>{component}</div>
))`
  & .ant-select-item {
    color: ${styleParams.grayText};
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

export default styled((props) => (
  <AntSelect
    dropdownStyle={{
      border: `1px solid ${styleParams.mainColorDark}`,
      borderRadius: "8px",
    }}
    dropdownRender={(origin) => <StyledDropdown component={origin} />}
    suffixIcon={<SuffixIcon disabled={props.disabled} />}
    {...props}
  />
))`
  min-width: 170px;
  font-size: 16px;
  color: ${styleParams.grayText};

  &:not(.ant-select-customize-input) {
    &.ant-select-focused:not(.ant-select-disabled) .ant-select-selector {
      box-shadow: none;
      border-color: ${styleParams.mainColorDark};
    }

    & .ant-select-selector {
      border-radius: 100px;
      padding: 0 16px;
      border-color: ${styleParams.grayText};
      transition: none;

      & .ant-select-selection-item {
        margin-right: 12px;
      }
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

  & .ant-select-selection-placeholder {
    display: flex;
    align-items: center;
    color: ${styleParams.grayText};
  }

  & .ant-select-arrow {
    right: 16px;
  }
`;
