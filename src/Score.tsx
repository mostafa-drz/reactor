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

export default Score;
