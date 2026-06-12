import { useState } from "react";

import "./index.css";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
