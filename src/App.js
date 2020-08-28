import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserContext from "./context/UserContext/UserContext";
import AppMain from "./AppMain";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "styled-react-modal";
import { grey } from "./settings";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: ${grey[400]};
`;

function App() {
  const userState = useState(false);

  return (
    <StyledDiv className="App">
      <UserContext.Provider value={userState}>
        <ModalProvider>
          <Header />
          <AppMain />
          <ToastContainer />
          <GlobalStyle />
        </ModalProvider>
      </UserContext.Provider>
    </StyledDiv>
  );
}

export default App;
