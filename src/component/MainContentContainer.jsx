import styled from "styled-components";
import styleParams from "../constant/styleParams";

export default styled(({ hasSecondToolbar, ...rest }) => <div {...rest} />)`
  height: calc(
    100% - ${styleParams.toolbarHeight}px
      ${(props) =>
        props.hasSecondToolbar ? `- ${styleParams.secondToolbarHeight}` : ""}px
  );
`;
