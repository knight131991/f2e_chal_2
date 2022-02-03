import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Error } from "../images/Error.svg";
import styled from "styled-components";
import FlexBox from "./FlexBox";

function EmptyResultHint({ specificStr, ...rest }) {
  return (
    <FlexBox justify="center" align="center" {...rest}>
      <Error />
      <div>無此{specificStr}，請嘗試其他關鍵字</div>
    </FlexBox>
  );
}

EmptyResultHint.defaultProps = {
  specificStr: "站點",
};
EmptyResultHint.propTypes = {
  specificStr: PropTypes.string,
};

export default styled(EmptyResultHint)`
  border: 1px solid #c75d5d;
  max-width: 324px;
  font-size: 20px;
  gap: 14px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  padding: 30px;
  color: #c75d5d;
`;
