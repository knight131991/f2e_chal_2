import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled((props) => <div {...props} />)`
  height: 100vh;
  max-height: fill-available;
  box-sizing: content-box;
  padding-top: ${styleParams.headerHeight};
`;
