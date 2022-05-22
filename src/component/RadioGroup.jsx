import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";
import styled from "styled-components";
import RadioButton from "./RadioButton";

const StyledRGroup = styled(Radio.Group)`
  padding: 8px;
  min-height: 64px;
  background-color: #f5f5f5;
  border-radius: 100px;
  white-space: nowrap;

  & .ant-radio-button-wrapper {
    border-radius: 100px;
    border: none;

    &:before {
      content: none;
    }

    &:first-child {
      margin-right: 8px;
    }
  }
`;

function RadioGroup({ items, onChange, ...rest }) {
  return (
    <StyledRGroup onChange={(e) => onChange(e.target.value)} {...rest}>
      {items.map(({ value, label, icon }) => (
        <RadioButton value={value} key={value}>
          {label}
          {icon}
        </RadioButton>
      ))}
    </StyledRGroup>
  );
}

RadioGroup.defaultProps = {
  items: [],
  onChange: () => {},
};
RadioGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.element,
      icon: PropTypes.element,
      value: PropTypes.string,
    })
  ),
};

export default RadioGroup;
