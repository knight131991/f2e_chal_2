import React, { useMemo, useEffect } from "react";
// import PropTypes from "prop-types";
import initAxios from "../utils/initAxios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import Home from "./home/Home";
import NavHeader from "../component/NavHeader";
import FlexBox from "../component/FlexBox";
import BikeRoute from "./BikeRoute";
import PlanPage from "./planPage/PlanPage";
import useGetUserPos from "../hooks/useGetUserPos";
import BikeSpot from "./BikeSpot";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const PageContainer = styled(FlexBox)`
  overflow: auto;
  width: 100%;
  background: ${({ darkMode }) => darkMode && "#1e1e1e"};
  transition: background-color 0.8s ease-out;
`;

function Main(props) {
  const { pathname } = useLocation();
  const [pos] = useGetUserPos();

  useEffect(() => {
    initAxios();
  }, []);

  const pages = useMemo(
    () => [
      { path: "/home", component: () => <Home /> },
      { path: "/plan", component: () => <PlanPage /> },
      { path: "/bike-spot", component: () => <BikeSpot /> },
      { path: "/bike-route", component: () => <BikeRoute /> },
    ],
    []
  );
  return (
    <Container>
      <NavHeader opaque={pathname !== "/home"} pos={pos} />
      <PageContainer flex align darkMode={pathname !== "/home"}>
        <Switch>
          {pages.map(({ path, component }) => (
            <Route key={path} path={path} render={component} />
          ))}
          <Redirect to="/home" />
        </Switch>
      </PageContainer>
    </Container>
  );
}

Main.propTypes = {};

export default Main;
