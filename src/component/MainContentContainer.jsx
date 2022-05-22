import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled(({ offsetTop, ...rest }) => <div {...rest} />)`
  height: calc(
    100% - ${styleParams.toolbarHeight}px
      ${({ offsetTop }) => (offsetTop ? `- ${offsetTop}px` : "")}
  );
`;
