import React from "react";
import styled from "styled-components";
// import PropTypes from 'prop-types'

function PText(props) {
  return <span {...props} />;
}

// PText.propTypes = {};

export default styled(PText)`
  color: #37cc56;
`;
