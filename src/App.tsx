import React, { useEffect, useState } from "react";
import "./App.css";

const GRAY = "var(--gray)";
const BLACK = "var(--black)";
function App() {
  const [challenge, setChallenge] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  function generateNext() {
    const next = Math.round(Math.random() * 8);
    setChallenge((challenge) => challenge.concat(next + ""));
  }

  function handleClick(id: string): void {
    setUserInput((userInput) => userInput.concat(id));
  }
  function handleStart() {
    setChallenge([]);
    setUserInput([]);
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }
  useEffect(() => {
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== challenge[i]) {
        setGameOver(true);
        setStarted(false);
      }
    }
    if (userInput.join(",") === challenge.join(",")) {
      setUserInput([]);
      if (challenge.length !== 0) {
        setScore((score) => score + 1);
      }
      if (started) {
        generateNext();
      }
    }
  }, [userInput, challenge, started]);

  return (
    <div className="App">
      <h1>Among us Reactor!</h1>
      <div>
        <button
          disabled={started}
          onClick={handleStart}
          className={`btn-start ${started ? "disabled" : ""}`}
        >
          Start
        </button>
      </div>
      {gameOver && (
        <span className="gameover">Game Over, your score: {score}</span>
      )}
      <Score score={score} />
      <div className="board">
        <Left secquence={challenge} gameOver={gameOver} started={started} />
        <Reactor
          onClick={handleClick}
          gameOver={gameOver}
          userInput={userInput}
          started={started}
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
  started: boolean;
}) {
  const { gameOver, userInput, started } = props;
  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div key={`cell-${i}`} className={!started ? "disabled" : undefined}>
          {gameOver ? (
            <div
              className="button"
              style={{
                backgroundColor:
                  userInput.indexOf(i + "") !== -1
                    ? i + "" === userInput[userInput.length - 1]
                      ? "red"
                      : "green"
                    : GRAY,
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
    cells[i.toString()] = { id: i, backgroundColor: BLACK };
  }
  return cells;
}
function Left(props: {
  secquence: string[];
  gameOver: boolean;
  started: boolean;
}) {
  const { secquence, gameOver, started } = props;
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
        [s]: { ...cells[s], backgroundColor: BLACK },
      }));
    }, 500 * (index + 2));
  }

  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div
          key={`chhalenge-cell-${i}`}
          className={!started ? "disabled" : undefined}
        >
          {gameOver ? (
            <div
              className="button left"
              style={{
                backgroundColor:
                  secquence.indexOf(i + "") !== -1 ? "green" : GRAY,
              }}
            >
              {secquence.indexOf(i + "") !== -1
                ? getAllIndices(secquence, i + "")
                : ""}
            </div>
          ) : (
            <div
              className="button left"
              style={{ backgroundColor: cells[i + ""].backgroundColor }}
            />
          )}
        </div>
      );
    }
    return buttons;
  }
  return <div className="container left">{renderButtons()}</div>;
}

function getAllIndices(input: string[], search: string) {
  let indices = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === search) indices.push(i);
  }
  return indices.join(",");
}
export default App;
