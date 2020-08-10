import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserContext from "./context/UserContext/UserContext";
import AppMain from "./AppMain";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";

function App() {
  const userState = useState(false);

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
        <Header />
        <AppMain />
        <GlobalStyle />
      </UserContext.Provider>
    </div>
  );
}

export default App;
