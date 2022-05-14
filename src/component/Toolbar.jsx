import React from "react";
// import PropTypes from "prop-types";
import FlexBox from "./FlexBox";
import styled from "styled-components";
import { useRWDStyleParams } from "../hooks/useRWD";
import styleParams from "../constant/styleParams";

const Container = styled(({ padding, ...rest }) => <FlexBox {...rest} />)`
  height: 96px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1);
  background-color: ${styleParams.bg};
  padding: ${({ padding }) => padding};
`;

function Toolbar(props) {
  const { mainPadding } = useRWDStyleParams();
  return (
    <Container row align="center" {...props} padding={`0 ${mainPadding}`} />
  );
}

Toolbar.propTypes = {};

export default Toolbar;
