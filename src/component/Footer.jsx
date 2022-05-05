import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
// import PropTypes from "prop-types";
import { ReactComponent as Line } from "../images/line.svg";
import { ReactComponent as FB } from "../images/fb.svg";
import { ReactComponent as Instagram } from "../images/instagram.svg";
import styleParam from "../constant/styleParams";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 0 ${styleParam.padding.xl};
  color: #fff;
`;

const IconWrapper = styled(FlexBox)`
  height: 56px;
  gap: 24px;
`;

function Footer(props) {
  return (
    <FooterContainer>
      © L17 All Rights Reserved.
      <IconWrapper align="center" row>
        <FB />
        <Instagram />
        <Line />
      </IconWrapper>
    </FooterContainer>
  );
}

// Footer.propTypes = {};

export default Footer;
