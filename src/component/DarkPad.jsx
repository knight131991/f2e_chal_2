import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "./FlexBox";

function DarkPad(props) {
  return <FlexBox {...props} />;
}

DarkPad.propTypes = {};

export default styled(DarkPad)`
  padding: 24px;
  background-color: #252525;
`;
