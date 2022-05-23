import { Checkbox } from "antd";
import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled(Checkbox.Group)`
  white-space: nowrap;

  & .ant-checkbox-inner {
    width: 20px;
    height: 20px;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${styleParams.mainColorDark};
    &:after {
      transform: rotate(45deg) scale(1.2) translate(-50%, -50%);
    }
  }
  & .ant-checkbox-inner:after {
    left: 4.7px;
  }
  & .ant-checkbox-wrapper {
    font-size: 16px;
    white-space: nowrap;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${styleParams.mainColorDark};
  }
`;
