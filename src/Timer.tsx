function Timer(props: { elapsedPercent: number }) {
  const { elapsedPercent } = props;
  return (
    <div className="timer">
      <div className="elapsed-time" style={{ width: `${elapsedPercent}%` }}>
        <span
          style={{
            fontSize: "3rem",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {elapsedPercent <= 0 ? "💔" : "🎈"}
        </span>
        <span
          style={{
            fontSize: "3rem",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          🗡
        </span>
      </div>
    </div>
  );
}

export default Timer;
