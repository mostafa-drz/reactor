function Timer(props: { elapsedPercent: number }) {
  const { elapsedPercent } = props;
  return (
    <div className="timer">
      <div
        className="elapsed-time"
        style={{
          width: `${elapsedPercent}%`,
          backgroundColor: getBackgroundColor(elapsedPercent),
        }}
      />
    </div>
  );
}

function getBackgroundColor(percent: number) {
  if (percent > 60) {
    return "#283048";
  } else if (percent > 30 && percent < 60) {
    return "orange";
  } else {
    return "red";
  }
}
export default Timer;
