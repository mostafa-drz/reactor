import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Among us Reactor!</h1>
      <div className="board">
        <Reactor />
        <Reactor />
      </div>
    </div>
  );
}

function Reactor() {
  return (
    <div className="container">
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
      <div className="button" />
    </div>
  );
}

export default App;
