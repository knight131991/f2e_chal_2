import React, { useMemo, useEffect } from "react";
// import PropTypes from "prop-types";
import initAxios from "../utils/initAxios";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import NavHeader from "../component/NavHeader";
import FlexBox from "../component/FlexBox";
import Footer from "../component/Footer";
import Bg from "../images/BG.jpg";
import BikeRoute from "./BikeRoute";
import PlanPage from "./planPage/PlanPage";
import useGetUserPos from "../hooks/useGetUserPos";
import BikeSpot from "./BikeSpot";
import LimitHeightComponent from "../component/LimitHeightComponent";

const BG = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("${Bg}");
  color: #fff;
`;

const PageContainer = styled(LimitHeightComponent)`
  overflow: auto;
  width: 100%;
  padding: 40px 0;
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
    <BG row={false}>
      <NavHeader opaque={pathname !== "/home"} pos={pos} />
      <FlexBox flex align="center">
        <PageContainer flex darkMode={pathname !== "/home"}>
          <Switch>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} render={component} />
            ))}
            <Redirect to="/home" />
          </Switch>
        </PageContainer>
      </FlexBox>
      <Footer />
    </BG>
  );
}

Main.propTypes = {};

export default Main;
