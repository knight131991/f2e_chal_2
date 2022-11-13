import React from "react";
import { HashRouter } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";

const RootContainer = styled.div`
  height: 100vh;
  max-height: fill-available;
`;

function App() {
  return (
    <RootContainer>
      <HashRouter>
        <Main />
      </HashRouter>
    </RootContainer>
  );
}

export default App;
