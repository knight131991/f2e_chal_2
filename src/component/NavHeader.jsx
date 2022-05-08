import React, { useCallback, useMemo } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlexBox from "./FlexBox";
import Button from "./Button";
import PText from "./texts/PText";
import BlackText from "./texts/BlackText";
import Logo from "./Logo";
import useRWD, { useRWDStyleParams } from "../hooks/useRWD";
import { ReactComponent as MenuIcon } from "../images/icon/Menu.svg";
import screenEnum from "../constant/screenEnum";

const Container = styled(({ opaque, paddingLeft, paddingRight, ...rest }) => (
  <FlexBox {...rest} />
))`
  background-color: ${({ opaque }) => (opaque ? "#fafafa" : "#fafafa")};
  height: 72px;
  transition: background-color 0.8s ease-out;
  padding: 0 ${({ paddingRight }) => paddingRight} 0
    ${({ paddingLeft }) => paddingLeft};
`;

const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
`;

function NavHeader({ opaque, pos }) {
  const history = useHistory();
  const { mainPadding } = useRWDStyleParams();
  const { paddingRight, screen } = useRWD(
    { paddingRight: "96px" },
    { l: { paddingRight: "54px" }, s: { paddingRight: "20px" } }
  );

  const LinkBtn = useCallback(({ children, opaque, ...rest }) => {
    return (
      <Button type="link" {...rest}>
        {opaque ? <PText>{children}</PText> : <BlackText>{children}</BlackText>}
      </Button>
    );
  }, []);

  const btnList = useMemo(() => {
    const search = `lat=${pos.lat}&log=${pos.log}`;
    return [
      {
        name: "規劃路線",
        onClick: () => history.push({ search, pathname: "/plan" }),
      },
      { name: "Youbike地圖", onClick: () => history.push("/bike-spot") },
      {
        name: "自行車路線",
        onClick: () => history.push({ search, pathname: "/bike-route" }),
      },
    ];
  }, [history, pos]);
  return (
    <Container
      align="center"
      row
      justify="space-between"
      noShrink
      opaque={opaque}
      paddingLeft={mainPadding}
      paddingRight={paddingRight}
    >
      <Logo type="black-text" onClick={() => history.push("/home")} />
      {screen <= screenEnum.sm ? (
        <StyledMenuIcon />
      ) : (
        <FlexBox row gap={33}>
          {btnList.map(({ name, onClick }) => (
            <LinkBtn key={name} opaque={opaque} onClick={onClick}>
              {name}
            </LinkBtn>
          ))}
          <LinkBtn>
            <PText>註冊/登入</PText>
          </LinkBtn>
        </FlexBox>
      )}
    </Container>
  );
}

// NavHeader.propTypes = {};

export default NavHeader;
