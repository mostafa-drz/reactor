import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [challenge, setChallenge] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

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
        setGameOver(true);
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
      {gameOver && (
        <span className="gameover">Game Over, your score: {score}</span>
      )}
      <Score score={score} />
      <div className="board">
        <Left secquence={challenge} gameOver={gameOver} />
        <Reactor
          onClick={handleClick}
          gameOver={gameOver}
          userInput={userInput}
        />
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
function Reactor(props: {
  onClick: (id: string) => void;
  gameOver: boolean;
  userInput: string[];
}) {
  const { gameOver, userInput } = props;
  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div key={`cell-${i}`}>
          {gameOver ? (
            <div
              className="button"
              style={{
                backgroundColor:
                  userInput.indexOf(i + "") !== -1
                    ? i + "" === userInput[userInput.length - 1]
                      ? "red"
                      : "green"
                    : "#ccc",
              }}
            >
              {userInput.indexOf(i + "") !== -1
                ? getAllIndices(userInput, i + "")
                : ""}
            </div>
          ) : (
            <div className="button" onClick={() => props.onClick(i + "")} />
          )}
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
function Left(props: { secquence: string[]; gameOver: boolean }) {
  const { secquence, gameOver } = props;
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
          {gameOver ? (
            <div
              className="button"
              style={{
                backgroundColor:
                  secquence.indexOf(i + "") !== -1 ? "green" : "#ccc",
              }}
            >
              {secquence.indexOf(i + "") !== -1
                ? getAllIndices(secquence, i + "")
                : ""}
            </div>
          ) : (
            <div
              className="button"
              style={{ backgroundColor: cells[i + ""].backgroundColor }}
            />
          )}
        </div>
      );
    }
    return buttons;
  }
  return <div className="container">{renderButtons()}</div>;
}

function getAllIndices(input: string[], search: string) {
  let indices = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === search) indices.push(i);
  }
  return indices.join(",");
}
export default App;
