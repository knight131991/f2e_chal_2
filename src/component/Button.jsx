import React from "react";
import PropTypes from "prop-types";
import { Button as AntButton } from "antd";
import styled from "styled-components";
import styleParams from "../constant/styleParams";

function Button(props) {
  return <AntButton {...props} />;
}

Button.defaultProps = {
  type: undefined,
};
Button.propTypes = {
  type: PropTypes.string,
};

export default styled((props) => <Button {...props} />)`
  border-radius: 8px;
  height: auto;

  ${({ type }) => {
    if (!type || type === "default") {
      return `
      color:${styleParams.mainColor};
      background-color: #fff;
      border-color:${styleParams.mainColor}; 

      &:hover {
       border-color:${styleParams.mainColorDark};
       color: ${styleParams.mainColorDark};
      }
      `;
    } else if (type === "primary") {
      return `
    background-color:${styleParams.mainColorDark}; 
    border: none;
    color: #fff;
    
    &:hover {
       background-color:${styleParams.mainColor};
       color: #fff;
      }
      `;
    } else if (type === "link") {
      return `
        color: ${styleParams.mainColor};
        
        &:hover {
          color: ${styleParams.mainColor};
        }
        `;
    }
  }}
`;
