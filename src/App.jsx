import { HashRouter } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
