import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Among us Reactor!</h1>
      <div className="board">
        <Left secquence={["0", "2", "4", "0"]} />
        <Reactor />
      </div>
    </div>
  );
}

function Reactor(props: {}) {
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

interface Cell {
  id: number;
  backgroundColor: string;
}

function initCells(): { [id: string]: Cell } {
  const cells: { [id: string]: Cell } = {};
  for (let i = 0; i < 9; i++) {
    cells[i.toString()] = { id: i, backgroundColor: "#ccc" };
  }
  return cells;
}
function Left(props: { secquence: string[] }) {
  const { secquence } = props;
  const [cells, setCells] = useState<{ [id: string]: Cell }>(() => initCells());
  useEffect(() => {
    for (let i = 0; i < secquence.length; i++) {
      showCell(secquence[i], i);
    }
  }, [secquence]);

  function showCell(s: string, index: number) {
    setTimeout(() => {
      setCells((cells) => ({
        ...cells,
        [s]: { ...cells[s], backgroundColor: "red" },
      }));
    }, 500 * (index + 1));

    setTimeout(() => {
      setCells((cells) => ({
        ...cells,
        [s]: { ...cells[s], backgroundColor: "#ccc" },
      }));
    }, 500 * (index + 2));
  }

  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div>
          <div
            className="button"
            style={{ backgroundColor: cells[i + ""].backgroundColor }}
          />
        </div>
      );
    }
    return buttons;
  }
  return <div className="container">{renderButtons()}</div>;
}
export default App;
