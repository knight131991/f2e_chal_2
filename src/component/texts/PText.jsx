import React from "react";
import styled from "styled-components";
// import PropTypes from 'prop-types'
import styleParams from "../../constant/styleParams";

function PText(props) {
  return <span {...props} />;
}

// PText.propTypes = {};

export default styled(PText)`
  color: ${styleParams.mainColor};
`;
