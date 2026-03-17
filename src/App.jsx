import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginform from "./Components/Loginform";
import Homepage from "./Components/Homepage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
