import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserContext from "./context/UserContext/UserContext";
import AppMain from "./AppMain";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { grey } from "./settings";
import styled from "styled-components";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-000000",
};

TagManager.initialize(tagManagerArgs);



const StyledDiv = styled.div`
  background-color: ${grey[300]};
  min-height: calc(100vh + 1px);
`;

const StyledModalBackground = styled(BaseModalBackground)`
  background-color: #000000cf;
`;

function App() {
  const userState = useState(false);

  return (
    <StyledDiv className="App">
      <UserContext.Provider value={userState}>
        <ModalProvider backgroundComponent={StyledModalBackground}>
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
