import React, { useEffect, useState } from "react";
import "./App.css";
import Left from "./Left";
import Right from "./Right";
import Score from "./Score";

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
        <Right
          onClick={handleClick}
          gameOver={gameOver}
          userInput={userInput}
          started={started}
        />
      </div>
    </div>
  );
}

export default App;
