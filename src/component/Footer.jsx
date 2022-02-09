import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
// import PropTypes from "prop-types";
import { ReactComponent as Line } from "../images/line.svg";
import { ReactComponent as FB } from "../images/fb.svg";
import { ReactComponent as Instagram } from "../images/instagram.svg";
import LimitHeightComponent from "./LimitHeightComponent";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  background-color: rgba(0, 0, 0, 0.7);
`;
function Footer(props) {
  return (
    <FooterContainer>
      <LimitHeightComponent>
        © 2021 F2E All Rights Reserved.
        <FlexBox row>
          <FB />
          <Line />
          <Instagram />
        </FlexBox>
      </LimitHeightComponent>
    </FooterContainer>
  );
}

// Footer.propTypes = {};

export default Footer;
