import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="card">
        <img src="src/assets/whyReact-header.webp" alt="react genius" />
        <br />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount(() => 0)}>reset</button>
        <p>React genius</p>
      </div>
    </div>
  );
}

export default App;
