import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./index.css";
function App() {
  const [count, setCount] = useState(0);

  return <div className="bg-green-500 text-red-600">Hello, world</div>;
}

export default App;
