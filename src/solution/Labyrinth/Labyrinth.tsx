import React, { useEffect, useReducer, useState } from "react";

/** keep, add, change or remove types/props */
export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  height: number;
  width: number;
  moveLimit?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
}

const getIsSamePos = (
  [firstHeight, firstWidth]: number[],
  [secondHeight, secondWidth]: number[]
) => {
  return firstHeight === secondHeight && firstWidth === secondWidth;
};

const formatSamePos = (firstPos: any, secondPos: any, nameFormat = "") => {
  return getIsSamePos(firstPos, secondPos) ? nameFormat : "";
};

const reducer = (state: any, action: any) => {
  const { currPos, movesLeft, isGameWon } = state;
  console.log(isGameWon);
  if (movesLeft) {
    const [height, width] = currPos;
    const {
      height: maxHeight,
      width: maxWidth,
      availableCells,
      targetPosition,
    } = action.payload;
    let newPos = null;

    switch (action.type) {
      case "ArrowDown":
        newPos = [Math.min(maxHeight - 1, height + 1), width];
        break;
      case "ArrowLeft":
        newPos = [height, Math.max(0, width - 1)];
        break;
      case "ArrowUp":
        newPos = [Math.max(0, height - 1), width];
        break;
      case "ArrowRight":
        newPos = [height, Math.min(maxWidth - 1, width + 1)];
        break;
      default:
        return state;
    }

    const [newHeight, newWidth] = newPos;

    if (availableCells[newHeight][newWidth] && !getIsSamePos(newPos, currPos)) {
      return {
        ...state,
        currPos: newPos,
        movesLeft: movesLeft - 1,
        isGameEnd: !(movesLeft - 1),
        isGameWon: getIsSamePos(newPos, targetPosition),
      };
    }

    return state;
  }

  return state;
};

const Labyrinth = ({
  startingPosition,
  targetPosition,
  availableCells,
  moveLimit,
  cellSize,
  height,
  width,
}: Props) => {
  const [labState, dispatchPos] = useReducer(reducer, {
    currPos: [...startingPosition],
    movesLeft: moveLimit,
    isGameEnd: false,
    isGameWon: false,
  });

  const { currPos, movesLeft, isGameEnd, isGameWon } = labState;
  console.log(isGameWon);

  const handleEvent = (e: any) => {
    dispatchPos({
      type: e.key,
      payload: { availableCells, height, width, targetPosition },
    });
  };

  useEffect(() => {
    document.addEventListener("keyup", handleEvent);

    return () => {
      document.removeEventListener("keyup", handleEvent);
    };
  });

  return (
    <div className="labyrinth">
      {availableCells.map((arr, colIdx) => {
        const rowCells = arr.map((isValid, rowIdx) => {
          const cellPos = [colIdx, rowIdx];
          const validClassName = isValid ? "valid" : "";
          const posClassN = formatSamePos(currPos, cellPos, "currPos");
          const startClassN = formatSamePos(startingPosition, cellPos, "start");
          const endClassN = formatSamePos(targetPosition, cellPos, "end");

          return (
            <div
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
              className={`cell ${validClassName} ${posClassN} ${startClassN} ${endClassN}`}
            >
              {isValid}
            </div>
          );
        });

        return <div className="row">{rowCells}</div>;
      })}
      <div className="game-details">movesLeft: {movesLeft}</div>
      {isGameEnd ? <div className="game-end">Game has ended</div> : null}
    </div>
  );
};

export default Labyrinth;
