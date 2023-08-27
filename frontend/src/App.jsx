import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Story from "./pages/Story";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="max-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:story" element={<Story />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
