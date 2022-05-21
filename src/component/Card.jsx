import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "./FlexBox";

function Card(props) {
  return <FlexBox {...props} />;
}

Card.propTypes = {};

export default styled(Card)`
  // border: 1px solid #595959;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
`;
