import { useState } from "react";

import "./index.css";
import Register from "./Register";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Register />
    </div>
  );
}

export default App;
