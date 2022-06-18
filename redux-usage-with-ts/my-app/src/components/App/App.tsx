import React from "react";
import "./App.css";
import { Counter } from "../Counter/Counter";
import MyComponentToggler from "./../other/ConnectHocOnOff";
import UserList from "../other/UserList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <MyComponentToggler backgroundColor="lightGray" />
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

export default App;
