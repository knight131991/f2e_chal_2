import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled((props) => <div {...props} />)`
  height: calc(100% - ${styleParams.toolbarHeight}px);
`;
