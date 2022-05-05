import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../images/logo_no_bg.svg";
import { ReactComponent as LogoBlackIcon } from "../images/logo_black_no_bg.svg";
import { ReactComponent as LogoBlackTextIcon } from "../images/logo_black_text.svg";

function Logo({ type, ...rest }) {
  const Icon = useMemo(() => {
    switch (type) {
      case "primary-no-bg":
        return LogoIcon;
      case "black-no-bg":
        return LogoBlackIcon;
      case "black-text":
        return LogoBlackTextIcon;
      default:
        return "No Icon";
    }
  }, [type]);
  return <Icon {...rest} />;
}

Logo.defaultProps = {};
Logo.propTypes = {
  type: PropTypes.oneOf(["primary-no-bg", "black-no-bg", "black-text"]),
};

export default styled(Logo)`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "normal")};
  flex-shrink: 0;
`;
