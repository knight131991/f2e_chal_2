import React, { useMemo } from "react";
// import PropTypes from "prop-types";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import NavHeader from "../component/NavHeader";
import FlexBox from "../component/FlexBox";
import Footer from "../component/Footer";
import Bg from "../images/BG.jpg";
import PlanPage from "./PlanPage";

const BG = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("${Bg}");
  color: #fff;
`;

const PageContainer = styled(FlexBox)`
  overflow: auto;
`;

function Main(props) {
  const { pathname } = useLocation();

  const pages = useMemo(
    () => [
      { path: "/home", component: Home },
      { path: "/plan", component: PlanPage },
      { path: "/bike-spot", component: Home },
      { path: "/bike-route", component: Home },
    ],
    []
  );
  return (
    <BG row={false}>
      <NavHeader opaque={pathname !== "/home"} />
      <PageContainer flex>
        <Switch>
          {pages.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
          <Redirect to="/home" />
        </Switch>
      </PageContainer>
      <Footer />
    </BG>
  );
}

Main.propTypes = {};

export default Main;
