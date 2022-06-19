import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled((props) => <div {...props} />)`
  height: calc(100vh - ${styleParams.headerHeight}px);
  max-height: fill-available;
  box-sizing: content-box;
  padding-top: ${styleParams.headerHeight}px;
`;
