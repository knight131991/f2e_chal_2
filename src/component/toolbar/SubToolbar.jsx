import React from "react";
// import PropTypes from "prop-types";
import Toolbar from "./Toolbar";
import styleParams from "../../constant/styleParams";

function SubToolbar(props) {
  return <Toolbar height={styleParams.secondToolbarHeight} {...props} />;
}

SubToolbar.propTypes = {};

export default SubToolbar;
