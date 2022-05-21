// import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "./FlexBox";
import styleParams from "../constant/styleParams";

export default styled(({ label, ...rest }) => (
  <FlexBox {...rest}>{label}</FlexBox>
))`
  background-color: #f5f5f5;
  border-radius: 100px;
  min-height: 30px;
  color: ${styleParams.text};
  font-size: 16px;
  font-weight: 400;
  padding: 4px 16px;
`;
