// Router.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing"; // Create this component
import VirtualCube from "./comps/cube/VirtualCube";
import CubeCreate from "./pages/CubeCreate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/cube" element={<VirtualCube />} />
        <Route exact path="/create" element={<CubeCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
