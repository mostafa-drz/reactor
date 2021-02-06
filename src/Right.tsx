import { getAllIndices } from "./helpers";

function Right(props: {
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
                    : "var(--gray)",
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

export default Right;
