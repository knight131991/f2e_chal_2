import React from "react";
import PropTypes from "prop-types";

const FlexBox = ({ flex, row, justify, align, style, wrap, gap, ...rest }) => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: flex ? 1 : 0,
        justifyContent: justify,
        alignItems: align,
        gap,
        flexDirection: row ? "row" : "column",
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...rest}
    />
  );
};

FlexBox.defaultProps = {
  flex: undefined,
  row: undefined,
  justify: undefined,
  align: undefined,
  style: undefined,
  wrap: undefined,
  gap: undefined,
};

FlexBox.propTypes = {
  flex: PropTypes.bool,
  row: PropTypes.bool,
  justify: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  wrap: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FlexBox;
