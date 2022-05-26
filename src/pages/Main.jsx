import React, { useMemo, useEffect } from "react";
// import PropTypes from "prop-types";
import initAxios from "../utils/initAxios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import Home from "./home/Home";
import NavHeader, { pageRouterEnum } from "../component/navHeader/NavHeader";
import FlexBox from "../component/FlexBox";
import BikeRoute from "./BikeRoute";
import PlanPage from "./planPage/PlanPage";
import BikeSpot from "./bikeSpot/BikeSpot";
import useGetUserPos from "../hooks/useGetUserPos";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

function Main(props) {
  const { pathname } = useLocation();
  const [pos] = useGetUserPos();
  const { planPage, bikeRoute, bikeStop } = pageRouterEnum;

  useEffect(() => {
    initAxios();
  }, []);

  const pages = useMemo(
    () => [
      { path: "/home", component: () => <Home /> },
      { path: planPage.router, component: () => <PlanPage /> },
      { path: bikeStop.router, component: () => <BikeSpot /> },
      { path: bikeRoute.router, component: () => <BikeRoute /> },
    ],
    [planPage, bikeStop, bikeRoute]
  );
  return (
    <Container>
      <NavHeader opaque={pathname !== "/home"} curRouter={pathname} pos={pos} />
      <Switch>
        {pages.map(({ path, component }) => (
          <Route key={path} path={path} render={component} />
        ))}
        <Redirect to="/home" />
      </Switch>
    </Container>
  );
}

Main.propTypes = {};

export default Main;
