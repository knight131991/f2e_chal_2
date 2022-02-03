import React from "react";
import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import { Checkbox } from "antd";
import directionEnum from "../constant/directionEnum";
import styled from "styled-components";

const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-wrap: nowrap;

  & .ant-checkbox-wrapper {
    white-space: pre;
  }
`;
function DirectionCheckBox({ onChange }) {
  return (
    <FlexBox row>
      <StyledCheckboxGroup
        onChange={onChange}
        options={[
          {
            label: directionEnum.unidirection,
            value: directionEnum.unidirection,
          },
          { label: directionEnum.bilateral, value: directionEnum.bilateral },
        ]}
      />
    </FlexBox>
  );
}

DirectionCheckBox.defaultProps = {
  onChange: () => {},
};
DirectionCheckBox.propTypes = {
  onChange: PropTypes.func,
};

export default DirectionCheckBox;
