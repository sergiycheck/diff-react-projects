import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  console.log("count", count);

  return (
    <div className="App">
      <div className="card">
        <img src="src/assets/working_console_ninja.png" alt="" />
        <br />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>console ninja is working in this app</p>
      </div>
    </div>
  );
}

export default App;
