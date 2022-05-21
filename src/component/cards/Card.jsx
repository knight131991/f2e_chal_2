import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "../FlexBox";
import styleParams from "../../constant/styleParams";

function Card(props) {
  return <FlexBox {...props} />;
}

Card.propTypes = {};

export default styled(({ checked, ...rest }) => <Card {...rest} />)`
  ${({ checked }) => checked && `border: 1px solid ${styleParams.mainColor};`}
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
`;
