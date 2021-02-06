import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [challenge, setChallenge] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  function generateNext() {
    const next = Math.round(Math.random() * 8);
    setChallenge((challenge) => challenge.concat(next + ""));
  }

  function handleClick(id: string): void {
    setUserInput((setUserInput) => userInput.concat(id));
  }

  useEffect(() => {
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== challenge[i]) {
        console.log("Game Over", userInput, challenge);
      }
    }
    if (userInput.join(",") === challenge.join(",")) {
      setUserInput([]);
      if (challenge.length !== 0) {
        setScore((score) => score + 1);
      }
      generateNext();
    }
  }, [userInput, challenge]);

  return (
    <div className="App">
      <h1>Among us Reactor!</h1>
      <Score score={score} />
      <div className="board">
        <Left secquence={challenge} />
        <Reactor onClick={handleClick} />
      </div>
    </div>
  );
}

function Score(props: { score: number }) {
  const { score } = props;
  function renderScore() {
    let s = [];
    for (let i = 0; i < score; i++) {
      s.push(<span key={`score-${i}`} className="score"></span>);
    }
    return s;
  }
  return <div className="score-container">{renderScore()}</div>;
}
function Reactor(props: { onClick: (id: string) => void }) {
  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div key={`cell-${i}`}>
          <div className="button" onClick={() => props.onClick(i + "")} />
        </div>
      );
    }
    return buttons;
  }
  return <div className="container">{renderButtons()}</div>;
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
        <div key={`chhalenge-cell-${i}`}>
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
