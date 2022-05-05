import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import banner from "../../../images/pictures/unsplash__ezqPPf8Cpk.jpg";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";

const Container = styled(FlexBox)`
  background-image: url("${banner}");
  background-position: left;
  height: 400px;
  width: 100%;
  padding-left: 372px;
  font-size: 40px;
  color: #fff;
  font-weight: bold;
`;

const StyledSearch = styled(Input.Search)`
  max-width: 481px;

  & input {
    border-radius: 8px 0px 0px 8px;
    height: 54px;
  }

  & .ant-input-group-addon {
    border-radius: 8px;
  }

  &
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    height: 54px;
    background-color: #000;
    border: none;
    border-radius: 0px 8px 8px 0px;
    width: 96px;
  }
`;

function MoreInfoBanner(props) {
  return (
    <Container justify="center" gap={16} noShrink>
      獲得更多資訊
      <StyledSearch enterButton="送出" placeholder="請輸入您的 Email" />
    </Container>
  );
}

MoreInfoBanner.propTypes = {};

export default MoreInfoBanner;