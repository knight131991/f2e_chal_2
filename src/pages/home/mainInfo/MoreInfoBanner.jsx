import React, { useCallback, useMemo } from "react";
// import PropTypes from "prop-types";
import { Input, notification } from "antd";
import banner from "../../../images/pictures/unsplash__ezqPPf8Cpk.jpg";
import FlexBox from "../../../component/FlexBox";
import styled from "styled-components";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";

const Container = styled(({ isMdScreen, ...rest }) => <FlexBox {...rest} />)`
  background-image: url("${banner}");
  background-position: left;
  height: 400px;
  width: 100%;
  ${({ isMdScreen }) => !isMdScreen && "padding-left: 372px;"}
  font-size: 40px;
  color: #fff;
  font-weight: bold;
`;

const StyledSearch = styled(({ isMdScreen, ...rest }) => (
  <Input.Search {...rest} />
))`
  max-width: ${({ isMdScreen }) => (isMdScreen ? "397px" : "481px")};

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
  const openNotification = useCallback(() => {
    notification["warning"]({ message: "尚未實做此功能" });
  }, []);

  const { screen } = useRWD();
  const isMdScreen = useMemo(() => screen <= screenEnum.md, [screen]);

  return (
    <Container
      justify="center"
      isMdScreen={isMdScreen}
      gap={16}
      noShrink
      align={isMdScreen ? "center" : undefined}
    >
      獲得更多資訊
      <StyledSearch
        isMdScreen={isMdScreen}
        enterButton="送出"
        placeholder="請輸入您的 Email"
        onSearch={openNotification}
      />
    </Container>
  );
}

MoreInfoBanner.propTypes = {};

export default MoreInfoBanner;
