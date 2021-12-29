import React, { useCallback, useMemo } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlexBox from "./FlexBox";
import Button from "./Button";
import PText from "./PText";

const Container = styled(FlexBox)`
  background-color: ${({ opaque }) =>
    opaque ? "#1E1E1E" : "rgba(0, 0, 0, 0.3)"};
  height: 88px;
  transition: background-color 0.8s ease-out;
`;

function NavHeader({ opaque }) {
  const history = useHistory();

  const LinkBtn = useCallback(({ children, opaque, ...rest }) => {
    return (
      <Button type="link" {...rest}>
        {opaque ? <PText>{children}</PText> : children}
      </Button>
    );
  }, []);

  const btnList = useMemo(
    () => [
      { name: "規劃路線", onClick: () => history.push("/plan") },
      { name: "Youbike地圖", onClick: () => history.push("/bike-spot") },
      { name: "自行車路線", onClick: () => history.push("/bike-route") },
    ],
    [history]
  );
  return (
    <Container align="center" row justify="space-between" opaque={opaque}>
      <span onClick={() => history.push("/home")}>YouRoad</span>
      <div>
        {btnList.map(({ name, onClick }) => (
          <LinkBtn opaque={opaque} onClick={onClick}>
            {name}
          </LinkBtn>
        ))}
        <LinkBtn>登入</LinkBtn>
      </div>
    </Container>
  );
}

// NavHeader.propTypes = {};

export default NavHeader;
