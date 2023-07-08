import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DisplaySuggestedDrinks from "./components/DrinkDisplayPage";
import AllSuggestedDrinks from "./components/AllSuggestedDrinks";
import AllDrinks from "./components/AllDrinks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/mixedDrinks" element={<DisplaySuggestedDrinks />}></Route>
        <Route path="/allmixedDrinks" element={<AllSuggestedDrinks />}></Route>
        <Route path="/allDrinks" element={<AllDrinks />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
