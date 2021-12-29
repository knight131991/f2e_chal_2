import React from "react";
import PropTypes from "prop-types";
import { Button as AntButton } from "antd";
import styled from "styled-components";

function Button(props) {
  return <AntButton {...props} />;
}

Button.defaultProps = {
  type: undefined,
};
Button.propTypes = {
  type: PropTypes.string,
};

export default styled(Button)`
  ${({ type }) => {
    if (!type) {
      return `
    background-color:rgba(138, 138, 138, 0.6); 
    border: none;
    color: #fff;
    
    &:hover {
       background-color:rgba(138, 138, 138, 0.6);
    }
    `;
    } else if(type === 'link') {
        return `
        color: #fff;
        `;
    }
  }}
`;
