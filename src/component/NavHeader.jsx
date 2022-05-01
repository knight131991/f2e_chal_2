import React, { useCallback, useMemo } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlexBox from "./FlexBox";
import Button from "./Button";
import PText from "./texts/PText";
import LimitHeightComponent from "./LimitHeightComponent";
import BlockText from "./texts/BlockText";
import Logo from "./Logo";

const Container = styled(({ opaque, ...rest }) => <FlexBox {...rest} />)`
  background-color: ${({ opaque }) =>
    opaque ? "#fafafa" : "#fafafa"};
  height: 72px;
  transition: background-color 0.8s ease-out;
`;

function NavHeader({ opaque, pos }) {
  const history = useHistory();

  const LinkBtn = useCallback(({ children, opaque, ...rest }) => {
    return (
      <Button type="link" {...rest}>
        {opaque ? <PText>{children}</PText> : <BlockText>{children}</BlockText> }
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
    <Container align="center" row justify="center" opaque={opaque}>
      <LimitHeightComponent>
        <Logo/>
        <span onClick={() => history.push("/home")}>YouRoad</span>
        <div>
          {btnList.map(({ name, onClick }) => (
            <LinkBtn key={name} opaque={opaque} onClick={onClick}>
              {name}
            </LinkBtn>
          ))}
          <LinkBtn>登入</LinkBtn>
        </div>
      </LimitHeightComponent>
    </Container>
  );
}

// NavHeader.propTypes = {};

export default NavHeader;
