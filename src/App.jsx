import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";
import initAxios from "./utils/initAxios";

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: fill-available;
`;

function App() {
  useEffect(() => {
    initAxios();
  }, []);

  return (
    <RootContainer>
      <HashRouter>
        <Main />
      </HashRouter>
    </RootContainer>
  );
}

export default App;
