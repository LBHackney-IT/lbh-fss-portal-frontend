import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import UserContext from "./context/UserContext/UserContext";
import AppMain from "./AppMain";

function App() {
  const userState = useState(false);

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
        <Header />
        <AppMain />
      </UserContext.Provider>
    </div>
  );
}

export default App;
