import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
// import PropTypes from "prop-types";
import { ReactComponent as Line } from "../images/line.svg";
import { ReactComponent as FB } from "../images/fb.svg";
import { ReactComponent as Instagram } from "../images/instagram.svg";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  height: 72px;
`;
function Footer(props) {
  return (
    <FooterContainer>
      <FlexBox row flex justify="space-between">
        © 2021 F2E All Rights Reserved.
        <FlexBox row>
          <FB />
          <Line />
          <Instagram />
        </FlexBox>
      </FlexBox>
    </FooterContainer>
  );
}

// Footer.propTypes = {};

export default Footer;
