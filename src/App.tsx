import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Left from "./Left";
import Right from "./Right";
import Score from "./Score";
import Timer from "./Timer";
import githubIcon from "./github.png";

function App() {
  const [challenge, setChallenge] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const timer = useRef<any>();

  function handleClick(id: string): void {
    setUserInput((userInput) => userInput.concat(id));
  }
  function handleStart() {
    setChallenge([]);
    setUserInput([]);
    setScore(0);
    setTime(0);
    clearInterval(timer.current);
    setGameOver(false);
    setStarted(true);
  }
  useEffect(() => {
    if (!started) {
      return;
    }
    function generateNext() {
      let next: number;
      do {
        next = Math.round(Math.random() * 8);
      } while (next === +challenge[challenge.length - 1]);
      setChallenge((challenge) => challenge.concat(next + ""));
    }
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
      if (started) {
        generateNext();
      }
    }
  }, [userInput, challenge, started]);

  useEffect(() => {
    if (started) {
      timer.current = setInterval(() => {
        setTime((time) => time - 0.1);
      }, 300);
    } else if (!started) {
      clearInterval(timer.current);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [started, challenge]);

  useEffect(() => {
    setTime(challenge.length);
  }, [challenge]);
  useEffect(() => {
    if (time < 0 && started) {
      setGameOver(true);
      clearInterval(timer.current);
    }
  }, [time, started]);
  useEffect(() => {
    if (gameOver) {
      setStarted(false);
    }
  }, [gameOver]);
  return (
    <div className="App">
      <Timer elapsedPercent={(time / challenge.length) * 100} />
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
      <div className="github-logo">
        <a
          href="https://github.com/mostafa-drz/among-us-reactor"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="github-icon" />
        </a>
      </div>
    </div>
  );
}

export default App;
