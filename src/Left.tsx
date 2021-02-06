import { useState, useEffect } from "react";
import { Cell } from "./types";
import { getAllIndices } from "./helpers";

function initCells(): { [id: string]: Cell } {
  const cells: { [id: string]: Cell } = {};
  for (let i = 0; i < 9; i++) {
    cells[i.toString()] = { id: i, backgroundColor: "var(--black)" };
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
        [s]: { ...cells[s], backgroundColor: "var(--black)" },
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
                  secquence.indexOf(i + "") !== -1 ? "green" : "var(--gray)",
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

export default Left;
