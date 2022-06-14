import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import FlexBox from "../FlexBox";
import styledParams from "../../constant/styleParams";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const CollapsibleToolbar = styled.div`
  height: ${({ show, height }) => (show ? `${height}px` : 0)};
  transition: all 0.5s;
  overflow: hidden;
  z-index: 0;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  transition: all 0.5s;
  position: relative;
  z-index: 1;

  height: ${({ offsetTop = 0 }) => {
    return `calc(100% - ${offsetTop}px)`;
  }};
`;

const Handler = styled(FlexBox)`
  position: absolute;
  top: 0px;
  left: 50%;
  width: 60px;
  height: 24px;
  background: ${styledParams.bg};
  transform: translateX(-50%);
  z-index: 1;
  cursor: pointer;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1);
`;

function CollapsibleToolbarLayout({ toolbar, content, contentOffset }) {
  const [showToolbar, setShowToolbar] = useState(true);
  return (
    <>
      <CollapsibleToolbar
        height={styledParams.toolbarHeight + contentOffset}
        show={showToolbar}
      >
        {toolbar}
      </CollapsibleToolbar>
      <ContentWrapper
        offsetTop={showToolbar ? styledParams.toolbarHeight + contentOffset : 0}
      >
        <Handler justify="center" onClick={() => setShowToolbar(!showToolbar)}>
          {showToolbar ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Handler>
        {content}
      </ContentWrapper>
    </>
  );
}

// CollapsibleToolbarLayout.propTypes = {};

export default CollapsibleToolbarLayout;
