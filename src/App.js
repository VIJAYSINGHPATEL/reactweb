import React from "react";
import Body from "./components/Layout/body/Body";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Body></Body>
      </div>
    </BrowserRouter>
  );
}

export default App;
