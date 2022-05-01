import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as LogoIcon } from "../images/logo_block_no_bg.svg";

function Logo(props) {
  return <LogoIcon fill="current" stroke="red" />;
}

Logo.propTypes = {};

export default Logo;
