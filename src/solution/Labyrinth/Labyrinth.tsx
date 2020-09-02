import React, { useEffect, useReducer, useCallback } from "react";
import { GameDetails, GameEnd } from "./GameDetails";
import Cell from "../Cell/Cell";

/** keep, add, change or remove types/props */
export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
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

const formatSamePos = (
  firstPos: number[],
  secondPos: number[],
  nameFormat: String = ""
) => {
  return getIsSamePos(firstPos, secondPos) ? nameFormat : "";
};

const reducer = (state: any, action: any) => {
  if (action.type === "reset") {
    return {
      ...action.payload,
    };
  }

  const { currPos, movesLeft, isGameWon } = state;
  if (movesLeft && !isGameWon) {
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
}: Props) => {
  const [labState, dispatchPos] = useReducer(reducer, {
    currPos: [...startingPosition],
    movesLeft: moveLimit,
    isGameEnd: false,
    isGameWon: false,
  });

  const { currPos, movesLeft, isGameEnd, isGameWon } = labState;

  const handleEvent = useCallback(
    (e: KeyboardEvent) => {
      dispatchPos({
        type: e.key,
        payload: {
          availableCells,
          height: availableCells.length,
          width: availableCells[0].length,
          targetPosition,
        },
      });
    },
    [dispatchPos, availableCells, targetPosition]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, [handleEvent]);

  return (
    <div className="game">
      <div className="labyrinth">
        {availableCells.map((arr, colIdx) => {
          const rowCells = arr.map((isValid, rowIdx) => {
            const cellPos = [colIdx, rowIdx];
            const validClassName = isValid ? "valid" : "";
            const posClassN = formatSamePos(currPos, cellPos, "currPos");
            const startClassN = formatSamePos(
              startingPosition,
              cellPos,
              "start"
            );
            const endClassN = formatSamePos(targetPosition, cellPos, "end");

            return (
              <Cell
                key={rowIdx + colIdx}
                cellSize={cellSize}
                classesString={`${validClassName} ${posClassN} ${startClassN} ${endClassN}`}
              />
            );
          });

          return (
            <div className="row" key={colIdx}>
              {rowCells}
            </div>
          );
        })}
      </div>
      <GameDetails moveLimit={moveLimit} movesLeft={movesLeft} />
      <GameEnd
        isGameEnd={isGameEnd}
        isGameWon={isGameWon}
        dispatch={dispatchPos}
        payload={{
          currPos: [...startingPosition],
          movesLeft: moveLimit,
          isGameEnd: false,
          isGameWon: false,
        }}
      />
    </div>
  );
};

export default Labyrinth;
