import React, { useMemo, Suspense } from "react";
// import PropTypes from "prop-types";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import NavHeader, { pageRouterEnum } from "../component/navHeader/NavHeader";
import FlexBox from "../component/FlexBox";
import useGetUserPos from "../hooks/useGetUserPos";
const Home = React.lazy(() => import("./home/Home"));
const BikeSpot = React.lazy(() => import("./bikeSpot/BikeSpot"));
const BikeRoute = React.lazy(() => import("./BikeRoute"));
const PlanPage = React.lazy(() => import("./planPage/PlanPage"));

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const LazyComp = ({ children }) => (
  <Suspense fallback={<div> loading...</div>}>{children}</Suspense>
);

function Main(props) {
  const { pathname } = useLocation();
  const [pos] = useGetUserPos();
  const { planPage, bikeRoute, bikeStop } = pageRouterEnum;

  const pages = useMemo(
    () => [
      {
        path: "/home",
        component: () => (
          <LazyComp>
            <Home />
          </LazyComp>
        ),
      },
      {
        path: planPage.router,
        component: () => (
          <LazyComp>
            <PlanPage />
          </LazyComp>
        ),
      },
      {
        path: bikeStop.router,
        component: () => (
          <LazyComp>
            <BikeSpot />
          </LazyComp>
        ),
      },
      {
        path: bikeRoute.router,
        component: () => (
          <LazyComp>
            <BikeRoute />
          </LazyComp>
        ),
      },
    ],
    [planPage, bikeStop, bikeRoute]
  );
  console.log("wwwww");
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
