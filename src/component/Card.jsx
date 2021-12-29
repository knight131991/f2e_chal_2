import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "./FlexBox";

function Card(props) {
  return <FlexBox {...props} />;
}

Card.propTypes = {};

export default styled(Card)`
  border: 1px solid #595959;
  border-radius: 8px;
  background-color: #252525;
  padding: 24px;
`;
