import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

function FlexSpin({ className, ...rest }) {
  return <Spin wrapperClassName={className} size='large' {...rest} />;
}

FlexSpin.propTypes = {};

export default styled(FlexSpin)`
  width: 100%;
  height: 100%;
  display: flex;

  & > .ant-spin-container.ant-spin-blur {
    width: 100%;
    display: flex;
  }

  & > .ant-spin-container {
    width: 100%;
    display: flex;
  }

  & .ant-spin.ant-spin-spinning {
    max-height: inherit;
  }
`;
