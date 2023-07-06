import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DisplaySuggestedDrinks from "./components/DrinkDisplayPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/mixedDrinks" element={<DisplaySuggestedDrinks />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
