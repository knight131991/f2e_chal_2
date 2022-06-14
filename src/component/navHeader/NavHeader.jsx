import React, { useCallback, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlexBox from "../FlexBox";
import Button from "../Button";
import BlackText from "../texts/BlackText";
import Logo from "../Logo";
import useRWD, { useRWDStyleParams } from "../../hooks/useRWD";
import { ReactComponent as MenuIcon } from "../../images/icon/Menu.svg";
import screenEnum from "../../constant/screenEnum";
import Drawer from "./Drawer";
import styleParams from "../../constant/styleParams";

export const pageRouterEnum = {
  planPage: { label: "規劃路線", router: "/plan" },
  bikeStop: { label: "Youbike地圖", router: "/bike-spot" },
  bikeRoute: { label: "自行車路線", router: "/bike-route" },
};

const Container = styled(({ opaque, paddingLeft, paddingRight, ...rest }) => (
  <FlexBox {...rest} />
))`
  position: fixed;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: ${styleParams.bg};
  height: ${styleParams.headerHeight}px;
  transition: background-color 0.8s ease-out;
  padding: 0 ${({ paddingRight }) => paddingRight} 0
    ${({ paddingLeft }) => paddingLeft};

  & * {
    pointer-events: auto;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
`;

const LinkBtn = styled(({ children, opaque, checked, ...rest }) => (
  <Button type="link" {...rest}>
    <BlackText>{children}</BlackText>
  </Button>
))`
  font-weight: ${({ checked }) => (checked ? "bold" : undefined)};
`;

const DrawerBtn = styled.div`
  margin: 32px 0;

  & span {
    font-size: 18px;
    color: ${styleParams.mainColor};
  }
`;

function NavHeader({ opaque, pos, curRouter }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const history = useHistory();
  const { mainPadding } = useRWDStyleParams();
  const { planPage, bikeRoute, bikeStop } = pageRouterEnum;
  const { paddingRight, screen } = useRWD(
    { paddingRight: "96px" },
    { l: { paddingRight: "54px" }, s: { paddingRight: "20px" } }
  );

  const btnList = useMemo(() => {
    const search = `lat=${pos.lat}&log=${pos.log}`;
    return [
      {
        name: planPage.label,
        onClick: () => history.push({ search, pathname: planPage.router }),
        router: planPage.router,
      },
      {
        name: bikeStop.label,
        onClick: () => history.push(bikeStop.router),
        router: bikeStop.router,
      },
      {
        name: bikeRoute.label,
        onClick: () => history.push({ search, pathname: bikeRoute.router }),
        router: bikeRoute.router,
      },
    ];
  }, [history, pos, planPage, bikeRoute, bikeStop]);

  const btnListCreator = useCallback(
    (render, clickBC = () => {}) =>
      btnList.map(({ name, onClick, router }) => {
        const component = (
          <LinkBtn
            key={name}
            onClick={() => {
              onClick();
              clickBC();
            }}
            checked={curRouter === router}
          >
            {name}
          </LinkBtn>
        );
        return render ? <span key={name}>{render(component)}</span> : component;
      }),
    [curRouter, btnList]
  );

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
        <StyledMenuIcon onClick={() => setShowDrawer(true)} />
      ) : (
        <FlexBox row gap={33}>
          {btnListCreator()}
          {/* <LinkBtn>
            <PText>註冊/登入</PText>
          </LinkBtn> */}
        </FlexBox>
      )}
      <Drawer
        title={<Logo type="black-text" />}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        {btnListCreator(
          (origin) => (
            <DrawerBtn>{origin}</DrawerBtn>
          ),
          () => setShowDrawer(false)
        )}
      </Drawer>
    </Container>
  );
}

// NavHeader.propTypes = {};

export default NavHeader;
